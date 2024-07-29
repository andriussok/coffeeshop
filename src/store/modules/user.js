// src/store/modules/user.js
import { updateUser } from '@app-services/server';

const state = {
  userWishlist: [],
};

const mutations = {
  UPDATE_USER_WISHLIST(state, wishlist) {
    state.userWishlist = wishlist;
  },
  UPDATE_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  async fetchUserWishlist({ commit, rootState }) {
    const user = rootState.auth.user;
    if (user) {
      commit('UPDATE_USER_WISHLIST', user.wishlist);
    }
  },
  addToWishlist({ commit, rootState }, productId) {
    const user = rootState.auth.user;
    if (user) {
      if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        updateUser(user);
        commit('UPDATE_USER_WISHLIST', user.wishlist);
      }
    } else {
      alert('Please sign in to add to wishlist.');
    }
  },
  removeFromWishlist({ commit, rootState }, productId) {
    const user = rootState.auth.user;
    if (user) {
      user.wishlist = user.wishlist.filter(id => id !== productId);
      updateUser(user);
      commit('UPDATE_USER_WISHLIST', user.wishlist);
    } else {
      alert('Please sign in to remove from wishlist.');
    }
  },
  async updateUser({ commit }, user) {
    updateUser(user);
    commit('UPDATE_USER', user);
  },
};

const getters = {
  userWishlist: (state) => state.userWishlist,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
