<template>
  <div class="pb-8 pt-3">
    <div class="relative isolate px-6 pt-14 lg:px-8 bg-primary-800 rounded-lg mx-3 mb-5 overflow-hidden">
      <div class="bg-coffee absolute w-full h-full top-0 left-0 z-[-1] opacity-15">1</div>
      <div class="mx-auto max-w-xl pb-16 sm:pb-16 lg:pb-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Contact Us</h1>
          <p class="mt-6 text-lg leading-8 text-white">
            We offer top-quality coffee varieties online and in our shops. Buy coffee online or enjoy a cup in our cozy locations. We're here to help.
          </p>
        </div>
      </div>
    </div>
    
    <div class="bg-white py-8 sm:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">Our Locations</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">Visit our coffee shops to savor our premium coffee varieties or enjoy a relaxing sip of expertly brewed coffee. Find a shop near you.</p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          
          <div v-for="location in locations" :key="location">
            <h3 class="border-l border-primary-600 pl-6 font-semibold text-gray-900">{{ location.label }}</h3>
            <address class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p v-for="(address,idx) in location.value" :key="idx">{{ address }}</p>
            </address>
          </div>
        
        </div>
      </div>
    </div>

    <div class="py-4">
      <h2 class="font-bold m-3 text-xl">Discover our products</h2>
      <ProductSwiper :productIds="[5,9,8,11]" :minimalMode="true" :promoCard="true"/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductSwiper from '@app-components/ProductSwiper.vue';

const locations = [
  { label: 'London', value: ['241 Latte Lane', 'London, LDN 1AB'] },
  { label: 'Milan', value: ['5678 Cappuccino Court', 'Milan, ITA 20121'] },
  { label: 'Vilnius', value: ['2021 Brew St', 'Vilnius, LTU 01234'] },
  { label: 'Amsterdam', value: ['7890 Coffee Canal', 'Amsterdam, NLD 56789'] },
  { label: 'Los Angeles', value: ['1234 Arabica Ave', 'Los Angeles, CA 90000'] },
  { label: 'New York', value: ['5678 Espresso Lane', 'New York, NY 10001'] },
  { label: 'Toronto', value: ['9101 Mocha Blvd', 'Toronto, ON M5V 3K9'] },
  { label: 'Melbourne', value: ['3456 Brew Haven', 'Melbourne, VIC 3000'] }
];

const store = useStore();
// const products = computed(() => store.getters['products/filteredProducts']);
// const activeFilters = computed(() => store.getters['products/activeFilters']);

const fetchProducts = () => store.dispatch('products/fetchProducts');
// const updateActiveFilters = (filters) => store.dispatch('products/updateActiveFilters', filters);

onMounted(async () => {
  await fetchProducts();
});
</script>
