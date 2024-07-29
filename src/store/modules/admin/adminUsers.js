import { getUsers } from '@/services/server';

const state = {
  users: [],
  totalItems: 0,
};

const getters = {
  users: (state) => state.users,
  totalItems: (state) => state.totalItems,
};

const actions = {
  fetchItems({ commit }, { page = 1, pageSize = 10, filters = {} } = {}) {
    const data = getUsers(page, pageSize, filters);
    commit('setUsers', data.items);
    commit('setTotalItems', data.total);
  },
  setQueryParams({ dispatch }, { route, router, page, pageSize, filters }) {
    const queryParams = { page, pageSize, ...filters };
    router.push({ path: route.path, query: queryParams });
    dispatch('fetchItems', { page, pageSize, filters });
  },
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
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

