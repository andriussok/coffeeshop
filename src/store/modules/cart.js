// src/store/modules/cart.js
import { getCartByUserId, updateCart, createCart, clearCart } from '@app-services/server';

const state = {
  userCart: [],
};

const mutations = {
  SET_USER_CART(state, cart) {
    state.userCart = cart;
  },
  UPDATE_USER_CART(state, cart) {
    state.userCart = cart;
  },
  CLEAR_USER_CART(state) {
    state.userCart = [];
  },
};

const actions = {
  async fetchUserCart({ commit, rootState }) {
    const user = rootState.auth.user;
    if (user) {
      const cart = getCartByUserId(user.id) || { userId: user.id, items: [] };
      commit('SET_USER_CART', cart.items);
    } else {
      const guestCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      commit('SET_USER_CART', guestCart);
    }
  },
  async addToCart({ commit, state, rootState }, product) {
    const user = rootState.auth.user;
    if (user) {
      const cart = getCartByUserId(user.id) || { userId: user.id, items: [] };
      const existingProduct = cart.items.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.items.push({ ...product, quantity: 1 });
      }
      updateCart(cart);
      commit('SET_USER_CART', cart.items);
    } else {
      const guestCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      const existingProduct = guestCart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        guestCart.push({ ...product, quantity: 1 });
      }
      sessionStorage.setItem('guestCart', JSON.stringify(guestCart));
      commit('SET_USER_CART', guestCart);
    }
  },
  async decrementFromCart({ commit, state, rootState }, product) {
    const user = rootState.auth.user;
    if (user) {
      const cart = getCartByUserId(user.id) || { userId: user.id, items: [] };
      const existingProduct = cart.items.find(item => item.id === product.id);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        updateCart(cart);
        commit('SET_USER_CART', cart.items);
      } else if (existingProduct && existingProduct.quantity === 1) {
        await this.dispatch('cart/removeFromCart', product);
      }
    } else {
      const guestCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      const existingProduct = guestCart.find(item => item.id === product.id);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        sessionStorage.setItem('guestCart', JSON.stringify(guestCart));
        commit('SET_USER_CART', guestCart);
      } else if (existingProduct && existingProduct.quantity === 1) {
        await this.dispatch('cart/removeFromCart', product);
      }
    }
  },
  async updateCartItemQuantity({ commit, state, rootState }, product) {
    const user = rootState.auth.user;
    if (user) {
      const cart = getCartByUserId(user.id) || { userId: user.id, items: [] };
      const existingProduct = cart.items.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = product.quantity;
        updateCart(cart);
        commit('SET_USER_CART', cart.items);
      }
    } else {
      const guestCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      const existingProduct = guestCart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = product.quantity;
        sessionStorage.setItem('guestCart', JSON.stringify(guestCart));
        commit('SET_USER_CART', guestCart);
      }
    }
  },
  async removeFromCart({ commit, state, rootState }, productId) {
    const user = rootState.auth.user;
    if (user) {
      const cart = getCartByUserId(user.id) || { userId: user.id, items: [] };
      cart.items = cart.items.filter(item => item.id !== productId);
      updateCart(cart);
      commit('SET_USER_CART', cart.items);
    } else {
      const guestCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
      const updatedGuestCart = guestCart.filter(item => item.id !== productId);
      sessionStorage.setItem('guestCart', JSON.stringify(updatedGuestCart));
      commit('SET_USER_CART', updatedGuestCart);
    }
  },
  
  async clearCart({ commit, rootState }) {
    const user = rootState.auth.user;
    if (user) {
      clearCart(user.id);
    } else {
      sessionStorage.removeItem('guestCart');
    }
    commit('CLEAR_USER_CART');
  },

  async transferGuestCartToUser({ rootState, commit }) {
    const guestCart = JSON.parse(sessionStorage.getItem('guestCart')) || [];
    const user = rootState.auth.user;
    if (guestCart.length > 0 && user) {
      const cart = getCartByUserId(user.id) || { userId: user.id, items: [] };
      guestCart.forEach(item => {
        const existingProduct = cart.items.find(p => p.id === item.id);
        if (existingProduct) {
          existingProduct.quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
      });
      updateCart(cart);
      commit('SET_USER_CART', cart.items);
      sessionStorage.removeItem('guestCart');
    }
  },
};

const getters = {
  userCart: (state) => state.userCart,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
