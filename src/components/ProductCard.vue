<template>
  <router-link :to="{ path: `/product/${product.id}` }">
    <div class="product-card group ">
      <div class="relative flex justify-center w-full h-auto aspect-square overflow-hidden rounded-lg bg-gray-100 product-image-wrapper group-hover:shadow-lg">
        <img :src="product.image_url" alt="Product Image" class="object-cover z-10" />
        <span class="text-sm absolute z-20 bottom-1 right-2 product-price text-md text-gray-800">
          <span class="hidden group-hover:block text-primary hover:fill-primary">
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>

          </span>
        </span>
      </div>
      <div class="flex flex-col gap-1 w-full items-start">
        <template v-if="!imageOnly">
          <h3 class="mt-4 text-md">{{ product.name }}</h3>
          <template v-if="!minimalMode">
            <span class="text-gray-500 text-xs">{{ product.flavor_profile.join(', ') }}</span>
            <span class="text-gray-500 text-xs">Roast-{{ product.roast_level }}</span>
            <p v-if="!noPrice" class="text-md font-medium text-gray-800">£{{ product.price }}</p>
          </template>  
        </template>
      </div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  product: Object,
  noPrice: Boolean,
  minimalMode: Boolean,
  imageOnly: Boolean
});
</script>