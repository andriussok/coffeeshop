// src/store/modules/checkout.js

const state = {
  checkoutData: null,
  checkoutSuccess: false,
};

const mutations = {
  SET_CHECKOUT_DATA(state, data) {
    state.checkoutData = data;
  },
  CLEAR_CHECKOUT_DATA(state) {
    state.checkoutData = null;
  },
  SET_CHECKOUT_SUCCESS(state, success) {
    state.checkoutSuccess = success;
  },
};

const actions = {
  setCheckoutData({ commit }, data) {
    commit('SET_CHECKOUT_DATA', data);
  },
  clearCheckoutData({ commit }) {
    commit('CLEAR_CHECKOUT_DATA');
  },
  setCheckoutSuccess({ commit }, success) {
    commit('SET_CHECKOUT_SUCCESS', success);
  },
};

const getters = {
  checkoutData: (state) => state.checkoutData,
  checkoutSuccess: (state) => state.checkoutSuccess,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
