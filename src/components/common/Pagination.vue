<template>
  <nav class="flex max-sm:flex-col gap-3 items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="block">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ startItem }}</span>
        to
        <span class="font-medium">{{ endItem }}</span>
        of
        <span class="font-medium">{{ totalItems }}</span>
        results
      </p>
    </div>
    <div class="flex flex-1 justify-center sm:justify-end">
      <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        <span class="sr-only">Previous</span>
      </button>
      <template v-for="page in pageNumbers" :key="page">
        <button
          @click="setPage(page)"
          :class="[
            page === currentPage ? 'z-10 bg-primary-600 text-white focus-visible:outline-primary-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold'
          ]"
        >
          {{ page }}
        </button>
      </template>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        <span class="sr-only">Next</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  kind: {
    type: String,
    required: true,
  },
});

const store = useStore();
const route = useRoute();
const router = useRouter();

const currentPage = computed(() => parseInt(route.query.page) || 1);
const pageSize = computed(() => parseInt(route.query.pageSize) || 10);
const totalPages = computed(() => Math.ceil(store.getters[`${props.kind}/totalItems`] / pageSize.value));
const totalItems = computed(() => store.getters[`${props.kind}/totalItems`]);
const startItem = computed(() => (currentPage.value - 1) * pageSize.value + 1);
const endItem = computed(() => Math.min(currentPage.value * pageSize.value, totalItems.value));
const pageNumbers = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i);
  }
  return pages;
});

const ensureDefaultParams = () => {
  const page = parseInt(route.query.page) || 1;
  const pageSize = parseInt(route.query.pageSize) || 10;

  if (!route.query.page || !route.query.pageSize) {
    router.replace({ path: route.path, query: { ...route.query, page, pageSize } });
  } else {
    store.dispatch(`${props.kind}/fetchItems`, { page, pageSize, filters: { searchTerm: route.query.searchTerm || '' } });
  }
};

const setPage = (page) => {
  const filters = { searchTerm: route.query.searchTerm || '' };
  router.push({ path: route.path, query: { ...route.query, page } });
  store.dispatch(`${props.kind}/fetchItems`, { page, pageSize: pageSize.value, filters });
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    setPage(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    setPage(currentPage.value - 1);
  }
};

onMounted(() => {
  ensureDefaultParams();
});

watch(
  route,
  () => {
    const page = parseInt(route.query.page) || 1;
    const pageSize = parseInt(route.query.pageSize) || 10;
    const filters = { searchTerm: route.query.searchTerm || '' };
    store.dispatch(`${props.kind}/fetchItems`, { page, pageSize, filters });
  },
  { immediate: true }
);
</script>
