<template>
  <div v-if="products.length === 0" class="text-center text-gray-500">
    <p class="py-16">No products found.</p>
  </div>
  <div v-else>
    <transition-group
      name="product"
      tag="div"
      class="mx-3 my-3 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-4"
    >
      <ProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        :class="['transform transition duration-300 ease-in-out', { 'delay-${index * 300}ms': true }]"
      />
    </transition-group>
  </div>
</template>

<script setup>
import ProductCard from '@app-components/ProductCard.vue';

const props = defineProps({
    products: {
      type: Array,
      required: true,
    },
});
</script>

<style>
.product-enter-active,
.product-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.product-enter-from,
.product-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.product-enter-to,
.product-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>