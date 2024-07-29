<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TopBar from '@app-components/common/TopBar.vue';
import Header from '@app-components/common/Header.vue';
import Footer from '@app-components/common/Footer.vue';
import ToastContainer from '@app-components/common/ToastContainer.vue';

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<template>
    <ToastContainer />
    
    <template v-if="!isAdminRoute">
      <TopBar />
      <Header />
    </template>
    
    <main class="flex-grow">
      <router-view />
    </main>
    
    <template v-if="!isAdminRoute">
      <Footer />
    </template>

</template>