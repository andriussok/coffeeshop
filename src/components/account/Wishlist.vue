<template>
  <div>
    <h1 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Wishlist</h1>
    <p class="mt-1 text-sm leading-6 text-gray-500">Your wishlist items.</p>
    <ProductList :products="wishlistedProducts" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductList from '@app-components/ProductList.vue';

const store = useStore();

const wishlist = computed(() => store.getters['user/userWishlist']);
const allProducts = computed(() => store.getters['products/allProducts']);
const wishlistedProducts = computed(() => {
  return allProducts.value.filter(product => wishlist.value.includes(product.id));
});

onMounted(() => {
  store.dispatch('user/fetchUserWishlist');
  store.dispatch('products/fetchProducts');
});
</script>
