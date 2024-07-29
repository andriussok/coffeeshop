<!-- src/views/Signout.vue -->
<template>
  <div>Signing out...</div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from '@app-utils/toastUtils.js';

const store = useStore();
const router = useRouter();
const showToast = useToast();

store.dispatch('auth/signout').then(() => {
  router.push('/');
  showToast({ message: 'You have been Signed Out', type: 'success'});
});
</script>
