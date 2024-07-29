// src/store/modules/auth.js
import { v4 as uuidv4 } from 'uuid';
import SHA256 from 'crypto-js/sha256';
import encBase64 from 'crypto-js/enc-base64';
import { createUser, getUser, getUserById, updateUser, updatePassword, signoutOtherSessions, verifyUser, deleteUser } from '@app-services/server';

const generateSalt = () => Math.random().toString(36).substring(2, 15);

const hashPassword = (password, salt) => {
  const saltedPassword = password + salt;
  const hash = SHA256(saltedPassword);
  return hash.toString(encBase64);
};

const state = {
  isSignedIn: false,
  user: null,
};

const mutations = {
  SIGNIN(state, user) {
    state.isSignedIn = true;
    state.user = user;
  },
  SIGNOUT(state) {
    state.isSignedIn = false;
    state.user = null;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  DELETE_USER(state) {
    state.isSignedIn = false;
    state.user = null;
  },
};

const actions = {
  async signup({ commit, dispatch }, user) {
    const existingUser = getUser(user.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const userId = uuidv4();
    const salt = generateSalt();
    const hashedPassword = hashPassword(user.password, salt);

    const newUser = {
      id: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      salt: salt,
      createdAt: new Date().toISOString(),
      wishlist: [],
      verified: false, // New user is not verified
    };

    createUser(newUser);
    commit('SET_USER', newUser);
    // localStorage.setItem('currentUser', newUser.id);
    // await dispatch('cart/transferGuestCartToUser', null, { root: true });
    // dispatch('cart/fetchUserCart', null, { root: true });
  },

  async signin({ commit, dispatch }, { username, password }) {
    const user = getUser(username);
    if (!user) {
      throw new Error('Username does not exist');
    }
    const hashedPassword = hashPassword(password, user.salt);
    if (user.password !== hashedPassword) {
      throw new Error('Invalid credentials');
    }
    if (!user.verified) {
      throw new Error('User not verified');
    }
    commit('SIGNIN', user);
    localStorage.setItem('currentUser', user.id);

    await dispatch('cart/transferGuestCartToUser', null, { root: true });
    dispatch('cart/fetchUserCart', null, { root: true });
  },

  async verifyUser({ commit, dispatch }, { username }) {
    const user = verifyUser(username);
    if (user) {
      commit('SET_USER', user);
      commit('SIGNIN', user);
      localStorage.setItem('currentUser', user.id);

      await dispatch('orders/transferGuestOrdersToUser', { email: user.email, userId: user.id }, { root: true });
      await dispatch('cart/transferGuestCartToUser', null, { root: true });
      
      dispatch('cart/fetchUserCart', null, { root: true });
    } else {
      throw new Error('Verification failed');
    }
  },

  signout({ commit, dispatch }) {
    return new Promise((resolve) => {
      commit('SIGNOUT');
      localStorage.removeItem('currentUser');
      dispatch('cart/clearCart', null, { root: true }).then(() => {
        resolve();
      });
    });
  },

  async updateUser({ state, commit }, updatedFields) {
    try {
      // Merge current user data with updated fields
      const updatedUserData = { ...state.user, ...updatedFields };
      const updatedUser = updateUser(updatedUserData);
      commit('SET_USER', updatedUser);
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  },

  async updatePassword({ state }, { currentPassword, newPassword }) {
    const user = state.user;
    const hashedCurrentPassword = hashPassword(currentPassword, user.salt);
    if (user.password !== hashedCurrentPassword) {
      throw new Error('Current password is incorrect');
    }

    const newSalt = generateSalt();
    const hashedNewPassword = hashPassword(newPassword, newSalt);
    
    try {
      await updatePassword({ id: user.id, password: hashedNewPassword, salt: newSalt });
    } catch (error) {
      throw new Error('Failed to update password');
    }
  },

  async signoutOtherSessions({ state }, { password }) {
    const user = state.user;
    const hashedPassword = hashPassword(password, user.salt);
    if (user.password !== hashedPassword) {
      throw new Error('Password is incorrect');
    }

    try {
      await signoutOtherSessions(user.id);
    } catch (error) {
      throw new Error('Failed to sign out from other sessions');
    }
  },

  async deleteUser({ commit, dispatch, state }) {
    const userId = state.user.id;
    deleteUser(userId);
    commit('DELETE_USER');
    localStorage.removeItem('currentUser');
    dispatch('cart/clearCart', null, { root: true });
  },

  initializeAuth({ commit, dispatch }) {
    const userId = localStorage.getItem('currentUser');
    if (userId) {
      const user = getUserById(userId);
      if (user) {
        commit('SET_USER', user);
        commit('SIGNIN', user);
        dispatch('cart/fetchUserCart', null, { root: true });
      }
    }
  },
};

const getters = {
  isSignedIn: (state) => state.isSignedIn,
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
