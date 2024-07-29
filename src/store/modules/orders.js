// src/store/modules/orders.js
import { createOrder, getOrdersByUserId, getOrdersByEmail, updateOrderUserId, clearCart } from '@app-services/server';

const state = {
  userOrders: [],
};

const mutations = {
  SET_USER_ORDERS(state, orders) {
    state.userOrders = orders;
  },
  ADD_USER_ORDER(state, order) {
    state.userOrders.push(order);
  },
  UPDATE_ORDER(state, updatedOrder) {
    const index = state.userOrders.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      state.userOrders.splice(index, 1, updatedOrder);
    }
  },
};

const actions = {
  async fetchUserOrders({ commit, rootState }) {
    const user = rootState.auth.user;
    if (user) {
      const orders = getOrdersByUserId(user.id);
      commit('SET_USER_ORDERS', orders);
    }
  },
  async addUserOrder({ commit, rootState, dispatch }, order) {
    createOrder(order);
    commit('ADD_USER_ORDER', order);

    const userId = rootState.auth.user ? rootState.auth.user.id : 'guest';
    clearCart(userId);  // Clear the server-side cart
    await dispatch('cart/clearCart', null, { root: true });  // Clear the Vuex state cart

    if (userId === 'guest') {
      sessionStorage.removeItem('guestCart');
    }
  },
  async fetchOrdersByEmail({ commit }, email) {
    const orders = getOrdersByEmail(email);
    commit('SET_USER_ORDERS', orders);
    return orders;
  },

  async updateOrderWithUserId({ commit }, { orderId, userId }) {
    const updatedOrder = updateOrderUserId(orderId, userId);
    if (updatedOrder) {
      commit('UPDATE_ORDER', updatedOrder);
    }
  },

  async transferGuestOrdersToUser({ dispatch }, { email, userId }) {
    const guestOrders = await dispatch('fetchOrdersByEmail', email);
    for (const order of guestOrders) {
      if (order.userId === 'guest') {
        await dispatch('updateOrderWithUserId', { orderId: order.id, userId });
      }
    }
  },
};

const getters = {
  userOrders: (state) => state.userOrders,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
