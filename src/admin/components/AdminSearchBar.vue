<template>
  <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-gray-300 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
    <button type="button" class="-m-2.5 p-2.5 text-gray-900 xl:hidden" @click="$emit('toggle-sidebar')">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-5 w-5" aria-hidden="true" />
    </button>
    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <form class="flex flex-1" @submit.prevent>
        <label for="search-field" class="sr-only">Search</label>
        <div class="relative w-full">
          <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500" aria-hidden="true" />
          <input
            v-model="searchTerm"
            @input="onInput"
            id="search-field"
            class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const searchTerm = ref('');
const route = useRoute();
const router = useRouter();
const store = useStore();

const onInput = () => {
  const filters = { searchTerm: searchTerm.value };
  const page = parseInt(route.query.page) || 1;
  const pageSize = parseInt(route.query.pageSize) || 10;
  router.push({ path: route.path, query: { ...route.query, searchTerm: searchTerm.value, page: 1 } });
  store.dispatch('adminUsers/fetchItems', { page: 1, pageSize, filters });
};
</script>
