import api from '@app-services/api';
import { generateFilters } from '@app-utils/filterUtils';

const state = {
  products: [],
  filters: [],
  activeFilters: {},
  filteredProducts: [],
  searchQuery: ''
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_FILTERS(state, filters) {
    state.filters = filters;
  },
  SET_ACTIVE_FILTERS(state, activeFilters) {
    state.activeFilters = activeFilters;
  },
  SET_FILTERED_PRODUCTS(state, filteredProducts) {
    state.filteredProducts = filteredProducts;
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  }
};

const actions = {
  async fetchProducts({ commit }) {
    const products = await api.getProducts();
    commit('SET_PRODUCTS', products);
    const filters = generateFilters(products);
    commit('SET_FILTERS', filters);
    commit('SET_FILTERED_PRODUCTS', products);  // Initialize filteredProducts with all products
  },
  updateActiveFilters({ commit, dispatch }, activeFilters) {
    const normalizedFilters = {};
    for (const key in activeFilters) {
      if (activeFilters[key].length) {
        normalizedFilters[key] = activeFilters[key].map(value => value.toString().toLowerCase());
      }
    }
    commit('SET_ACTIVE_FILTERS', normalizedFilters);
    dispatch('filterProducts');
  },
  updateSearchQuery({ commit, dispatch }, query) {
    commit('SET_SEARCH_QUERY', query);
    dispatch('filterProducts');
  },
  filterProducts({ commit, state }) {
    let filteredProducts = state.products.filter(product => {
      return state.filters.every(filter => {
        const activeFilterValues = state.activeFilters[filter.id] || [];
        if (activeFilterValues.length === 0) return true;

        if (Array.isArray(product[filter.id])) {
          return product[filter.id].some(value => activeFilterValues.includes(value.toString().toLowerCase()));
        }

        return activeFilterValues.includes(product[filter.id].toString().toLowerCase());
      });
    });

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.flavor_profile && product.flavor_profile.some(flavor => flavor.toLowerCase().includes(query)))
      );
    }

    commit('SET_FILTERED_PRODUCTS', filteredProducts);
  },
};

const getters = {
  allProducts: (state) => state.products,
  allFilters: (state) => state.filters,
  activeFilters: (state) => state.activeFilters,
  filteredProducts: (state) => state.filteredProducts.length ? state.filteredProducts : [],
  productById: (state) => (id) => state.products.find(product => product.id === id),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
