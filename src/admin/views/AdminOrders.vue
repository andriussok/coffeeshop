<template>
  <div>
    <h1 class="text-2xl font-bold px-8 py-4">Orders</h1>
        
    <!-- Orders Table -->
    <div class="border-t border-gray-300 pt-11">
      <h2 class="px-4 text-base font-semibold leading-7 text-gray-900 sm:px-6 lg:px-8">
        {{ orders.length ? 'Latest activity' : 'Nothing to show' }}
      </h2>
      <table class="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col class="w-full sm:w-4/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
        </colgroup>
        <thead class="border-b border-gray-300 text-sm leading-6 text-gray-900">
          <tr>
            <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">User</th>
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Order number</th>
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Total amount</th>
            <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">Status</th>
            <th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">Date placed</th>
            <th scope="col" class="py-2 pl-0 pr-8 font-semibold lg:pr-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item in orders" :key="item.id">
            <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <CubeIcon class="w-6 text-primary-500 rounded-full mix-blend-multiply" />
                <div class="truncate text-sm font-medium leading-6 text-gray-900">{{ item.email }}</div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm leading-6 text-gray-600">{{ item.id }}</div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm leading-6 text-gray-600">£{{ item.total.toFixed(2) }}</div>
              </div>
            </td>
            <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                <div :class="[statuses[item.status], 'flex-none rounded-full p-1']">
                  <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
                </div>
                <div class="hidden text-gray-900 sm:block">{{ item.status }}</div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-600 sm:table-cell sm:pr-6 lg:pr-8">
              <time :datetime="item.createdAt">{{ formatDate(item.createdAt) }}</time>
            </td>
            <td class="py-4 pl-0 pr-8 text-sm leading-6 text-gray-600 lg:pr-6 text-right">
              <span @click="showToast({ message: 'This is just a demo stage.', type: 'info' });" class="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-300">View</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <Pagination kind="adminOrders" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Pagination from '@app-components/common/Pagination.vue';
import { CubeIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@app-utils/toastUtils.js';

const store = useStore();
const route = useRoute();
const router = useRouter();
const orders = computed(() => store.getters['adminOrders/orders']);
const showToast = useToast();

const fetchOrders = () => store.dispatch('adminOrders/fetchItems');

onMounted(() => {
  fetchOrders();
});

// Function to convert ISO date to localized format (Jun 18 2024)
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  return date.toLocaleDateString(navigator.language, options).replace(',', '');
};

// Order statuses
const statuses = {
  Pending: 'text-orange-400 bg-orange-400/10',
  Completed: 'text-green-400 bg-green-400/10',
  Cancelled: 'text-rose-400 bg-rose-400/10'
};

const ensureDefaultParams = () => {
  const page = parseInt(route.query.page) || 1;
  const pageSize = parseInt(route.query.pageSize) || 10;

  if (!route.query.page || !route.query.pageSize) {
    router.replace({ path: route.path, query: { ...route.query, page, pageSize } });
  } else {
    store.dispatch('adminOrders/fetchItems', { page, pageSize, filters: { searchTerm: route.query.searchTerm || '' } });
  }
};

onMounted(() => {
  ensureDefaultParams();
});
</script>
