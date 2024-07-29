<template>
  <div class="bg-white pb-32 pt-3">
    <div class="relative isolate px-6 pt-14 lg:px-8 bg-primary-800 rounded-lg mx-3 overflow-hidden">
      <div class="bg-coffee absolute w-full h-full top-0 left-0 z-[-1] opacity-15">1</div>
      <div class="mx-auto max-w-2xl pb-16 sm:pb-16 lg:pb-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Coffee Shop</h1>
          <p class="mt-6 lg:text-lg lg:leading-8 text-white">
            Discover exceptional coffee at our Coffee Shop, where each cup is a delightful experience. Savor meticulously brewed coffees crafted from the finest beans.
          </p>
        </div>
      </div>
    </div>
    
    <div>
      <div class="bg-primary-300 rounded-lg m-3">
        <div class="flex items-start sm:items-center justify-between mx-auto p-4 gap-x-2 gap-y-5 w-full flex-wrap lg:flex-nowrap">
          <div v-if="!hasActiveFiltersOrSearchQuery()" class="p-2 text-xs hidden lg:block max-lg:order-last">All Products</div>
          <ul v-if="hasActiveFiltersOrSearchQuery()" class="flex flex-wrap items-center gap-2 max-lg:order-last">
            <li class="sm:border-r border-primary pr-2 mr-1 w-full sm:w-auto">
              <button type="button" @click="clearFilters" class="text-xs p-2 rounded-lg hover:shadow-md hover:bg-primary-100">Clear Filters</button>
            </li>
            <li v-for="(values, filter) in activeFilters" :key="filter" class="bg-primary-100 rounded-lg p-0.5">
              <span v-for="value in values" :key="value" class="inline-flex items-center gap-x-0.5 rounded-md px-2 py-1 text-xs capitalize">
                {{ value }}
                <button @click="removeFilter(filter, value)" type="button" class="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
                  <span class="sr-only">Remove</span>
                  <svg viewBox="0 0 14 14" class="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75">
                    <path d="M4 4l6 6m0-6l-6 6" />
                  </svg>
                  <span class="absolute -inset-1" />
                </button>
              </span>
            </li>
            <li v-if="searchQuery.trim().length" class="bg-primary-100 rounded-lg p-0.5">
              <span class="inline-flex items-center gap-x-0.5 rounded-md px-2 py-1 text-xs capitalize">
                {{ searchQuery }}
                <button @click="clearSearch" type="button" class="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
                  <span class="sr-only">Remove</span>
                  <svg viewBox="0 0 14 14" class="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75">
                    <path d="M4 4l6 6m0-6l-6 6" />
                  </svg>
                  <span class="absolute -inset-1" />
                </button>
              </span>
            </li>
          </ul>
          
  
          <div class="relative text-gray-700 lg:ml-auto max-lg:flex-grow">
            <input v-model="searchQuery" @input="handleSearch" type="search" name="serch" placeholder="Search" class="w-full bg-primary-50 focus:bg-white h-10 px-5 pr-10 rounded-full text-sm border-0 focus:outline-none focus:ring-0 hover:shadow focus:shadow-md active:shadow-md">
            <button @click="handleSearch" type="button" class="absolute right-0 top-0 mt-3 mr-4">
              <MagnifyingGlassIcon class="h-4 w-4" />
            </button>
          </div>
          
          <button type="button" @click="openFilterModal = true" class="flex items-center rounded-md hover:shadow-md hover:bg-primary-100">
            <AdjustmentsHorizontalIcon class="w-9 h-9 p-1.5" />
            <span class="hidden md:block ml-1 mr-3 text-xs">Filters</span>
          </button>
        </div>
      </div>

      <ProductFilterModal :openFilterModal="openFilterModal" @close="openFilterModal = false" />
      <ProductList :products="products" :openFilterModal="openFilterModal" />

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductList from '@app-components/ProductList.vue';
import ProductFilterModal from '@app-components/ProductFilterModal.vue';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const store = useStore();

const openFilterModal = ref(false);
const searchQuery = ref('');

const filteredProducts = computed(() => store.getters['products/filteredProducts']);
const activeFilters = computed(() => store.getters['products/activeFilters']);
const products = computed(() => filteredProducts.value);

const fetchProducts = () => store.dispatch('products/fetchProducts');
const updateActiveFilters = (filters) => store.dispatch('products/updateActiveFilters', filters);
const updateSearchQuery = (query) => store.dispatch('products/updateSearchQuery', query);

const hasActiveFiltersOrSearchQuery = () => {
  return (Object.keys(activeFilters.value).length > 0 || searchQuery.value.trim().length > 0);
};

const removeFilter = (filter, value) => {
  const newFilters = { ...activeFilters.value };
  newFilters[filter] = newFilters[filter].filter(item => item !== value);
  if (newFilters[filter].length === 0) {
    delete newFilters[filter];
  }
  updateActiveFilters(newFilters);
};

const clearSearch = () => {
  searchQuery.value = '';
  updateSearchQuery(searchQuery.value);
};

const clearFilters = () => {
  updateActiveFilters({});
  clearSearch();
};

const handleSearch = () => {
  updateSearchQuery(searchQuery.value);
};

onMounted(async () => {
  await fetchProducts();
});
</script>