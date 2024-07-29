<template>
  <div>
    <h1 class="text-2xl font-bold px-8 py-4">Products</h1>

    <!-- Products Table -->
    <div class="border-t border-gray-300 pt-11 overflow-x-auto">
      <h2 class="px-4 text-base font-semibold leading-7 text-gray-900 sm:px-6 lg:px-8">Product List</h2>
      <table class="mt-6 w-full max-w-screen whitespace-nowrap text-left">
        <colgroup>
          <col class="lg:w-auto" />
          <col class="w-full sm:w-4/12" />
          <col class="lg:w-4/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
        </colgroup>
        <thead class="border-b border-gray-300 text-sm leading-6 text-gray-900">
          <tr>
            <th scope="col" class="py-2 pl-4 font-semibold sm:pl-6 lg:pl-8">ID</th>
            <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">Product Name</th>
            <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">IMG</th>
            <th scope="col" class="py-2 pl-0 pr-8 font-semibold sm:pl-6 lg:pl-0">Price</th>
            <th scope="col" class="py-2 pl-0 pr-8 font-semibold sm:table-cell">Stock</th>
            <th scope="col" class="py-2 pl-0 pr-8 font-semibold lg:pr-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id">
            <td class="py-4 pl-4 sm:pl-6 lg:pl-8">
              <div class="truncate w-full font-mono text-sm leading-6 text-gray-600">{{ product.id }}</div>
            </td>
            <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <div class="truncate text-sm font-medium leading-6 text-gray-900">{{ product.name }}</div>
              </div>
            </td>
            <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <img :src="product.image_url" alt="" class=" h-10 w-10 -m-1 scale-150" />
              </div>
            </td>
            <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                <time class="text-gray-600 sm:block">£{{ product.price }}</time>
              </div>
            </td>
            <td class="py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                <div :class="[statuses[product.roast_level], 'flex-none rounded-full p-1']">
                  <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
                </div>
              </div>
            </td>
            <td class="py-4 pl-0 pr-8 text-sm leading-6 text-gray-600 lg:pr-6 text-right">
              <span @click="showToast({ message: 'This is just a demo stage.', type: 'info' });" class="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300">View</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <Pagination kind="adminProducts" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Pagination from '@app-components/common/Pagination.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@app-utils/toastUtils.js'

const store = useStore();
const products = computed(() => store.getters['adminProducts/products']);
const showToast = useToast();



const fetchProducts = () => store.dispatch('adminProducts/fetchItems');

onMounted(() => {
  fetchProducts();
});

// Function to convert ISO date to localized format (Jun 18 2024)
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  return date.toLocaleDateString(navigator.language, options).replace(',', '');
};

// User statuses
const statuses = {
  1: 'text-green-400 bg-green-400/10',
  2: 'text-green-400 bg-green-400/10',
  3: 'text-green-400 bg-green-400/10',
  4: 'text-green-400 bg-green-400/10',
  5: 'text-orange-400 bg-orange-400/10',
};
</script>
