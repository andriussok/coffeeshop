<template>
  <div class="bg-white">
    <div v-if="products.length" class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

      <form v-on:submit.prevent class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
            <li v-for="(product, productIdx) in products" :key="product.id" class="flex py-6">
              <div class="flex-shrink-0">
                <img :src="product.image_url" :alt="product.name" class="border h-24 w-24 rounded-md object-cover object-center" />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <router-link :to="{path:`/product/${product.id}`}" class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</router-link>
                      </h3>
                    </div>
                    
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ formatPrice(product.price) }}</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <!-- Quantity selector -->
                    <div class="relative flex items-center max-w-[8rem]">
                      <button @click="decrementQuantity(product)" type="button" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input type="text" v-model.number="product.quantity" @change="updateQuantity(product)" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" />
                      <button @click="incrementQuantity(product)" type="button" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>

                    <div class="absolute right-0 top-0">
                      <button @click="removeFromCart(product)" type="button" class="-m-2 text-sm inline-flex p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Remove</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading" class="sticky top-0 mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Subtotal</dt>
              <dd class="text-sm font-medium text-gray-900">{{ formatPrice(subtotal) }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Learn more about how shipping is calculated</span>
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">{{ formatPrice(shipping) }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Learn more about how tax is calculated</span>
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">{{ formatPrice(tax) }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">{{ formatPrice(total) }}</dd>
            </div>
          </dl>

          <div class="mt-6">
            <router-link to="/checkout" class="w-full inline-block text-center rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50">
              Checkout
            </router-link>
          </div>
        </section>
      </form>
    </div>
    <div v-else class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <p class="text-base font-medium text-gray-800">Oh Nooo...</p>
        <h1 class="mt-2 font-bold tracking-tight sm:text-5xl">Your cart is empty!</h1>
        <router-link to="/products" class="block mt-5 text-primary-600 underline">Back to Products</router-link>
      </div>
      <div class="w-full py-4">
          <h2 class="sm:pl-6 m-3 text-xl">Discover more products</h2>
          <ProductSwiper :productIds="randomProductIds" :minimalMode="true" :promoCard="true"/>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { QuestionMarkCircleIcon } from '@heroicons/vue/20/solid';

import ProductSwiper from '@app-components/ProductSwiper.vue';
import { getRandomProductIds } from '@app-utils/productUtils';

const store = useStore();

const products = computed(() => store.getters['cart/userCart']);

const subtotal = computed(() => {
  return products.value.reduce((acc, product) => acc + (product.price * product.quantity), 0);
});

const shipping = 5.00;

const tax = computed(() => {
  return (subtotal.value + shipping) * 0.20;
});

const total = computed(() => {
  return subtotal.value + shipping + tax.value;
});

const formatPrice = (price) => {
  return `£${price.toFixed(2)}`;
};

const incrementQuantity = (product) => {
  store.dispatch('cart/addToCart', { ...product, quantity: 1 });
};

const decrementQuantity = (product) => {
  if (product.quantity > 1) {
    store.dispatch('cart/decrementFromCart', product);
  } else {
    removeFromCart(product);
  }
};

const updateQuantity = (product) => {
  store.dispatch('cart/updateCartItemQuantity', product);
};

const removeFromCart = (product) => {
  if(product.id) {
    store.dispatch('cart/removeFromCart', product.id);
  }
};
store.dispatch('cart/fetchUserCart');


const randomProductIds = ref([]);
const allProducts = computed(() => store.getters['products/allProducts']);
const fetchProducts = () => store.dispatch('products/fetchProducts');

const updateRandomProductIds = () => {
  randomProductIds.value = getRandomProductIds(allProducts.value, 5);
};
onMounted(async () => {
  if (!allProducts.value.length) {
    await fetchProducts();
  }
  updateRandomProductIds();
});



</script>
