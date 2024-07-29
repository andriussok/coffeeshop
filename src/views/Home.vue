<template>
  <div class="bg-white pt-3 min-h-full">
    <div class="relative h-[400px] flex items-center isolate px-6 pt-14 lg:px-8 bg-primary-800 rounded-lg mx-3 overflow-hidden">
      <div class="bg-coffee absolute w-full h-full top-0 left-0 z-[-1] opacity-15">1</div>
      <div class="mx-auto max-w-2xl pb-16 sm:pb-16 lg:pb-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Coffee</h1>
          <p class="mt-6 lg:text-lg lg:leading-8 text-white">
            Discover exceptional coffee at our Coffee Shop, where each cup is a delightful experience. Savor meticulously brewed coffees crafted from the finest beans.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link to="/products" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Our Products</router-link>
            <router-link to="/company" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="px-5 pt-5 text-2xl font-bold">
      <h2>Featured</h2>
    </div> -->
    <ProductSwiper :productIds="[1,2,3,4]" :minimalMode="true" :promoCard="true"/>
    <div class="mt-auto flex flex-col items-center">
      <Testimonials />
      <router-link to="/products" class="mb-10 rounded-md bg-primary px-16 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Find your Coffee</router-link>
    </div>
    <div class="mt-auto">
      <Newsletter />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import ProductSwiper from '@app-components/ProductSwiper.vue';
import Testimonials from '@app-components/Testimonials.vue';
import Newsletter from '@app-components/Newsletter.vue';

const store = useStore();

const fetchProducts = () => store.dispatch('products/fetchProducts');

onMounted(async () => {
  await fetchProducts();
});
</script>