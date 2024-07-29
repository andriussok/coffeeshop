import api from '@app-services/api';
import { paginateAndFilter } from '@/services/server';

const state = {
  products: [],
  totalItems: 0,
};

const getters = {
  products: (state) => state.products,
  totalItems: (state) => state.totalItems,
};

const actions = {
  async fetchItems({ commit }, { page = 1, pageSize = 10, filters = {} } = {}) {
    const products = await api.getProducts();
    const data = paginateAndFilter(products, page, pageSize, filters)
    commit('SET_PRODUCTS', data.items);
    commit('setTotalItems', data.total);
  },
  setQueryParams({ dispatch }, { route, router, page, pageSize, filters }) {
    const queryParams = { page, pageSize, ...filters };
    router.push({ path: route.path, query: queryParams });
    dispatch('fetchItems', { page, pageSize, filters });
  },
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  setTotalItems(state, totalItems) {
    state.totalItems = totalItems;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
