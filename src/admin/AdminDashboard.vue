<template>
  <div>
    <AdminSidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />
    <div class="xl:pl-72">
      <AdminSearchBar @toggle-sidebar="sidebarOpen = !sidebarOpen" :sidebarOpen="sidebarOpen" />
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AdminSidebar from '@app-admin/components/AdminSidebar.vue';
import AdminSearchBar from '@app-admin/components/AdminSearchBar.vue';

const sidebarOpen = ref(false);
const store = useStore();

</script>
