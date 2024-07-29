// src/store/modules/toast.js
const state = {
  toasts: []
};

const mutations = {
  ADD_TOAST(state, toast) {
    state.toasts.push(toast);
  },
  REMOVE_TOAST(state, toastId) {
    state.toasts = state.toasts.filter(toast => toast.id !== toastId);
  }
};

const actions = {
  showToast({ commit }, toast) {
    const existingToast = state.toasts.find(t => t.message === toast.message && t.type === toast.type);
    if (existingToast && !toast.repeat ) return;

    const id = Date.now();
    commit('ADD_TOAST', { ...toast, id });
    if (toast.autoDismiss) {
      commit('REMOVE_TOAST', id);
    }
  },
  removeToast({ commit }, toastId) {
    commit('REMOVE_TOAST', toastId);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
