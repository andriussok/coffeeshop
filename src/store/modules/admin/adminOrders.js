import { getOrders } from '@/services/server';

const state = {
  orders: [],
  totalItems: 0,
};

const getters = {
  orders: (state) => state.orders,
  totalItems: (state) => state.totalItems,
};

const actions = {
  fetchItems({ commit }, { page = 1, pageSize = 10, filters = {} } = {}) {
    const data = getOrders(page, pageSize, filters);
    commit('setOrders', data.items);
    commit('setTotalItems', data.total);
  },
  setQueryParams({ dispatch }, { route, router, page, pageSize, filters }) {
    const queryParams = { page, pageSize, ...filters };
    router.push({ path: route.path, query: queryParams });
    dispatch('fetchItems', { page, pageSize, filters });
  },
};

const mutations = {
  setOrders(state, orders) {
    state.orders = orders;
  },
  setTotalItems(state, totalItems) {
    state.totalItems = totalItems;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

