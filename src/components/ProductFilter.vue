<template>
  <div class="-pt-6 px-4">
    <div class="flex items-center h-[50px]">
      <button v-if="Object.keys(activeFilters).length" @click="clearFilters" type="button" class="text-xs rounded-lg bg-primary-200 py-1 px-3">Clear filters</button>
      <div v-else class="text-xs opacity-50">
        Find your favourite
      </div>
    </div>
    <form>
      <div v-for="section in allFilters" :key="section.id" class="border-b border-gray-200 py-6">
        <Disclosure as="div" :default-open="true">
          <template #default="{ open }">
            <h3 class="-my-3 flow-root">
              <DisclosureButton class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span class="font-medium text-gray-800">{{ section.name }}</span>
                <span class="ml-6 flex items-center">
                  <ChevronDownIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                  <ChevronUpIcon v-else class="h-5 w-5" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel class="pt-6">
              <div class="space-y-4">
                <div v-for="(option, optionIdx) in section.options" :key="option" class="flex items-center" :class="{'opacity-25': !isOptionAvailable(section.id, option)}">
                  <input
                    :id="`filter-${section.id}-${optionIdx}`"
                    :name="`${section.id}[]`"
                    :value="option"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    @change="updateFilter($event, section.id)"
                    :checked="isChecked(section.id, option)"
                    :disabled="!isOptionAvailable(section.id, option)"
                  />
                  <label :for="`filter-${section.id}-${optionIdx}`" class="capitalize ml-3 text-sm text-gray-800">{{ option }}</label>
                </div>
              </div>
            </DisclosurePanel>
          </template>
        </Disclosure>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';

const store = useStore();

// Map Vuex getters
const allFilters = computed(() => store.getters['products/allFilters']);
const activeFilters = computed(() => store.getters['products/activeFilters']);
const filteredProducts = computed(() => store.getters['products/filteredProducts']);

// Methods
const isChecked = (filterId, value) => {
  return activeFilters.value[filterId] && activeFilters.value[filterId].includes(value.toString().toLowerCase());
};

const isOptionAvailable = (filterId, value) => {
  const products = filteredProducts.value;
  return products.some(product => {
    if (Array.isArray(product[filterId])) {
      return product[filterId].some(option => option.toString().toLowerCase() === value.toString().toLowerCase());
    }
    return product[filterId].toString().toLowerCase() === value.toString().toLowerCase();
  });
};

const updateFilter = (event, filterId) => {
  const value = event.target.value.toString().toLowerCase();
  const checked = event.target.checked;
  const activeFiltersCopy = { ...activeFilters.value };

  if (!Array.isArray(activeFiltersCopy[filterId])) {
    activeFiltersCopy[filterId] = [];
  }

  if (checked) {
    if (!activeFiltersCopy[filterId].includes(value)) {
      activeFiltersCopy[filterId].push(value);
    }
  } else {
    activeFiltersCopy[filterId] = activeFiltersCopy[filterId].filter(item => item !== value);
    if (activeFiltersCopy[filterId].length === 0) {
      delete activeFiltersCopy[filterId];
    }
  }

  store.dispatch('products/updateActiveFilters', activeFiltersCopy);
};

const clearFilters = () => {
  store.dispatch('products/updateActiveFilters', {});
};
</script>