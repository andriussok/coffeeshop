<template>
  <div class="flex items-center gap-2 px-6 py-6 -mb-3 text-xs text-primary-600">
    <button type="button" @click="goBack" class="inline-flex items-center gap-2 hover:text-primary-800 hover:underline border-r border-gray-300 pr-2">
      <ArrowLeftIcon class="w-4"/>
      Back
    </button>
    <div v-if="breadcrumbs.length" class="truncate flex items-center gap-2">
      <router-link
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.path"
        :to="breadcrumb.path"
        class="inline-flex items-center gap-2 hover:text-primary-800 hover:underline"
      >
        <span v-if="index > 0">/</span>
        <span :class="{'text-gray-500': index === breadcrumbs.length - 1}">
          {{ breadcrumb.name }}
        </span>
      </router-link>
    </div>
    <div v-if="nextProduct" class="ml-auto group">
      <span class="hidden lg:group-hover:inline-block text-gray-500">{{ nextProduct.name }}</span>
      <button type="button" @click="goNext(nextProduct)" class="inline-flex items-center gap-2 hover:text-primary-800 hover:underline pl-2">
        Next
        <ArrowRightIcon class="w-4"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';

const store = useStore();
const route = useRoute();
const router = useRouter();

const allProducts = computed(() => store.getters['products/allProducts']);
const product = computed(() => {
  const productId = route.params.id;
  return allProducts.value ? allProducts.value.find(product => product.id === parseInt(productId)) : null;
});

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(p => p);
  const breadcrumbsArray = pathArray.map((path, index) => {
    let name;
    let breadcrumbPath = '/' + pathArray.slice(0, index + 1).join('/');
    if (index === 0) {
      name = 'All Products';
      breadcrumbPath = '/products';
    } else if (index === 1 && product.value) {
      name = product.value.name;
    } else {
      name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    }
    return { path: breadcrumbPath, name: name };
  });
  return breadcrumbsArray;
});

const goBack = () => {
  router.go(-1);
};

const nextProduct = computed(() => {
  if (!product.value) return null;
  const currentIndex = allProducts.value.findIndex(p => p.id === product.value.id);
  const nextIndex = (currentIndex + 1) % allProducts.value.length;
  return allProducts.value[nextIndex];
});

const goNext = (nextProduct) => {
  router.push({ path: `/product/${nextProduct.id}` });
};
</script>


<!-- <template>
  <div class="flex items-center gap-2 px-6 py-6 -mb-3 text-xs text-primary-600">
    <button type="button" @click="goBack" class="inline-flex items-center gap-2 hover:text-primary-800 hover:underline border-r border-gray-300 pr-2">
      <ArrowLeftIcon class="w-4"/>
      Back
    </button>
    <div v-if="breadcrumbs.length" class="truncate flex items-center gap-2">
      <router-link
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.path"
        :to="breadcrumb.path"
        class="inline-flex items-center gap-2 hover:text-primary-800 hover:underline"
      >
        <span v-if="index > 0">/</span>
        <span :class="{'text-gray-500': index === breadcrumbs.length - 1}">
          {{ breadcrumb.name }}
        </span>
      </router-link>
    </div>
    <div class="ml-auto group">
      <span></span>
      <button type="button" @click="goNext(nextProduct)" class="inline-flex items-center gap-2 hover:text-primary-800 hover:underline pl-2">
        Next
        <ArrowRightIcon class="w-4"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';

const store = useStore();
const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(p => p);
  const breadcrumbsArray = pathArray.map((path, index) => {
    const breadcrumbPath = '/' + pathArray.slice(0, index + 1).join('/');
    let name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    if(name === 'Product') {
      name = 'All Products';
    }
    return { path: breadcrumbPath, name: name };
  });
  return breadcrumbsArray;
});

const goBack = () => {
  router.go(-1);
};

const allProducts = computed(() => store.getters['products/allProducts']);
const product = computed(() => {
  const productId = route.params.id;
  return allProducts.value.find(product => product.id === parseInt(productId));
});

const nextProduct = computed(() => {
    const currentIndex = allProducts.value.findIndex(p => p.id === product.value.id);
    const nextIndex = (currentIndex + 1) % allProducts.value.length;
    return allProducts.value[nextIndex];
})

const goNext = (nextProduct) => {
    router.push({ path: `/product/${nextProduct.id}` });
  };
</script> -->