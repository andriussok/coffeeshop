<template>
  <div class="pb-8 pt-3">
    <div class="relative isolate px-6 pt-14 lg:px-8 bg-primary-800 rounded-lg mx-3 mb-5 overflow-hidden">
      <div class="bg-coffee absolute w-full h-full top-0 left-0 z-[-1] opacity-15">1</div>
      <div class="mx-auto max-w-2xl pb-16 sm:pb-16 lg:pb-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Coffee House</h1>
          <p class="mt-6 text-lg leading-8 text-white">
            Discover exceptional coffee at our Coffee Shop, where each cup is a delightful experience. Savor meticulously brewed coffees crafted from the finest beans.
          </p>
        </div>
      </div>
    </div>
  
    <div class="bg-white py-4 lg:py-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-4 max-lg:order-2">
            <div class="bg-coffee relative overflow-hidden rounded-3xl  px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <div class="absolute inset-0 bg-primary mix-blend-multiply" />
              <div class="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl" aria-hidden="true">
              </div>
              <figure class="relative isolate">
                <blockquote class="mt-6 text-xl font-semibold leading-8 text-white">
                  <p>“Our passion for quality coffee brings people together, inspires creativity, and creates moments of pure joy.”</p>
                </blockquote>
                <figcaption class="mt-6 text-sm leading-6 text-gray-300"><strong class="font-semibold text-white">Andrius Sok,</strong> CEO at Coffee House</figcaption>
              </figure>
            </div>
          </div>
          <div>
            <div class="text-base leading-7 text-gray-700 lg:max-w-lg">
              <p class="text-base font-semibold leading-7 text-gray-800">Company values</p>
              <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">On a mission to empower coffee&nbsp;enthusiasts</h1>
              <div class="max-w-xl">
                <p class="mt-6">At our core, we believe in bringing the highest quality coffee beans to our customers, empowering them to enjoy premium coffee experiences from the comfort of their homes. We are committed to sustainability, ethical sourcing, and building strong relationships with our farmers. Every bean tells a story of dedication and passion, ensuring every cup you brew is a testament to our values.</p>
                <p class="mt-8">Our team is dedicated to continuous improvement, innovation, and community engagement. We strive to create an inclusive environment where coffee lovers can share their passion, learn, and grow together. Our mission extends beyond just selling coffee beans; we aim to cultivate a global community that values quality, sustainability, and the joy of coffee.</p>
              </div>
            </div>
            <dl class="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">
              <div v-for="(stat, statIdx) in stats" :key="statIdx">
                <dt class="text-sm font-semibold leading-6 text-gray-600">{{ stat.label }}</dt>
                <dd class="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">{{ stat.value }}</dd>
              </div>
            </dl>
            <div class="mt-10 flex">
              <router-link :to="{ path: `/products` }" class="text-base font-semibold leading-7 text-primary">Explore our products <span aria-hidden="true">&rarr;</span></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="py-4">
      <h2 class="font-bold m-3 text-xl">Discover our products</h2>
      <ProductSwiper :productIds="[1,7,11,15]" :minimalMode="true" :promoCard="true"/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductSwiper from '@app-components/ProductSwiper.vue';

const stats = [
  { label: 'Founded', value: '2018' },
  { label: 'Locations', value: '8' },
  { label: 'Products', value: '20' },
  { label: 'Loyal customers', value: '24K' },
]

const store = useStore();
// const products = computed(() => store.getters['products/filteredProducts']);
// const activeFilters = computed(() => store.getters['products/activeFilters']);

const fetchProducts = () => store.dispatch('products/fetchProducts');
// const updateActiveFilters = (filters) => store.dispatch('products/updateActiveFilters', filters);

onMounted(async () => {
  await fetchProducts();
});
</script>
