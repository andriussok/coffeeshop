<template>
  <div v-if="topBarIsVisible" class="bg-primary-800 text-primary-100 py-2 px-6 lg:px-8 text-xs flex justify-between">
    <ul class="flex cursor-pointer">
      <li class="flex gap-5 group">
        <span>Developer Mode</span>
        <ul class="hidden group-hover:flex gap-5">
          <router-link as="li" to="/admin" class="hover:text-white">
            admin
          </router-link>
          <li class="hover:text-white" @click="showDevInfo">
            Info
          </li>
          <li class="hover:text-white" @click="clearStorage">
            Clear Database
          </li>
        </ul>
      </li>
    </ul>
    <XMarkIcon class="h-4" @click="closeTopBar" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@app-utils/toastUtils.js';

const store = useStore();
const router = useRouter();
const showToast = useToast();

const topBarIsVisible = ref(true);

const clearStorage = () => {
  if (confirm('Are you sure you want to clear the storage and sign out?')) {
    router.push('/signout').then(() => {
      localStorage.clear();
      sessionStorage.clear();
      showToast({ message: 'localStorage and sessionStorage cleared', type: 'success' });
    });
  }
};

const showDevInfo = () => {
  showToast({
    message: 'App data is stored in your browser for persistence. Use "Clear Database" to reset data and start fresh.',
    type: 'info',
  });
}

const closeTopBar = () => {
  topBarIsVisible.value = false;
}

</script>