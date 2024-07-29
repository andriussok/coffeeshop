<template>
  <div class="bg-white pb-8">
    <Breadcrumbs />
    <div v-if="product" class="mx-auto max-w-2xl px-4 py-3 lg:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:h-full">
        <!-- Image gallery -->
        <div class="aspect-square flex items-center rounded-xl lg:h-full overflow-hidden bg-gray-100 max-w-full">
          <!-- Image selector -->
          <div class="mx-auto max-w-2xl sm:block lg:max-w-none">
            <img :src="product.image_url" alt="product image" class="mb-4 scale-150 hover:scale-[1.75] transition-transform" />
          </div>
        </div>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 lg:h-full">
          <h1 class="text-3xl font-bold tracking-tight text-gray-800">{{ product.name }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl tracking-tight text-gray-800">£{{ product.price }}</p>
          </div>

          <div class="mt-3 min-h-[80px]">
            <h3 class="sr-only">Description</h3>
            <div class="space-y-6 text-base text-gray-700" v-html="product.description" />
          </div>

          <div class="mt-3 flex items-center gap-3">
            <h3 class="text-base text-gray-500 font-light">Weight:</h3>
            <p class="space-y-6 text-base text-gray-700">{{ product.weight }}g</p>
          </div>

          <div class="mt-3 flex items-center gap-3">
            <h3 class="text-base text-gray-500">Region:</h3>
            <p class="space-y-6 text-base text-gray-700">{{ product.region }}</p>
          </div>

          <div class="mt-3 flex items-center gap-3">
            <h3 class="text-base text-gray-500">Roast Level:</h3>
            <div class="flex items-center gap-x-2">
              <span class="text-base text-gray-700">{{ product.roast_level+' /' }}</span>
              <span class="flex gap-x-1">
                <span v-for="n in product.roast_level" class="circle-full w-3 aspect-square rounded-full bg-primary border border-primary" :key="n"></span>
                <span v-for="n in 5 - product.roast_level" class="circle-empty w-3 aspect-square rounded-full border border-primary-200" :key="5 - n"></span>
              </span>
            </div>
          </div>

          <div class="mt-3 flex items-center gap-3">
            <h3 class="text-base text-gray-500">Flavour:</h3>
            <div class="product-flavour">
              <span class="text-base text-gray-700">{{ product.flavor_profile.join(', ') }}</span>
            </div>
          </div>

          <div class="mt-3 flex items-center gap-3">
            <h3 class="text-base text-gray-500">Grind:</h3>
            <div class="product-grind-options">
              <span class="text-base text-gray-700">{{ product.grind_option.join(', ') }}</span>
            </div>
          </div>

          <form class="mt-6" @submit.prevent="handleAddToCart">

            <div class="mt-10 flex">
              <div v-if="basketProduct" class="flex relative flex-col max-w-xs flex-1 border border-transparent sm:w-full">
                <!-- Quantity selector when product is in cart -->
                <div class="relative flex items-center justify-center w-full">
                  <button @click="decrementQuantity(basketProduct)" type="button" class="flex justify-center items-center text-white bg-primary-600 hover:bg-primary-500 border-0 border-gray-300 rounded-s-lg p-3 h-12 w-1/5 focus:ring-gray-100 focus:ring-2 focus:outline-none"><MinusIcon class="w-5"/></button>
                  <input @keydown.enter.prevent type="text" v-model.number="basketProduct.quantity" @input="updateQuantity(basketProduct)" class="bg-gray-50 border-x-0 border-gray-300 h-12 text-center text-gray-900 w-3/5 text-sm focus:ring-0 focus:border-primary-600  block py-2.5" />
                  <button @click="incrementQuantity(basketProduct)" type="button" class="flex justify-center items-center text-white bg-primary-600 hover:bg-primary-500 border-0 border-gray-300 rounded-e-lg p-3 h-12 w-1/5 focus:ring-gray-100 focus:ring-2 focus:outline-none"><PlusIcon class="w-5"/></button>
                </div>
              </div>
              <button v-else type="submit" class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">Add to Basket</button>

              <button type="button" @click="handleToggleWishlist" class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <span class="sr-only">Add to favorites</span>
                <HeartIcon :class="{'fill-primary': isProductInWishlist, 'stroke-primary': isProductInWishlist}" class="h-6 w-6 flex-shrink-0 text-red" aria-hidden="true" />
              </button>

            </div>
            
            <div v-if="basketProduct" class="mt-6">
              <router-link :to="{ path:'/cart' }" class="text-sm font-medium text-primary-600 hover:text-primary-500">View Shopping Bag</router-link>
            </div>

          </form>

          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>
          </section>
        </div>
      </div>
    </div>

    <Reviews />
    
    <div class="py-4">
      <h2 class="sm:pl-6 m-3 text-xl">Discover more products</h2>
      <ProductSwiper :productIds="randomProductIds" :minimalMode="true" :promoCard="true"/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { StarIcon } from '@heroicons/vue/20/solid';
import { HeartIcon, MinusIcon, PlusIcon} from '@heroicons/vue/24/outline';
import ProductSwiper from '@app-components/ProductSwiper.vue';
import { getRandomProductIds } from '@app-utils/productUtils';
import Breadcrumbs from '@app-components/common/Breadcrumbs.vue';
import Reviews from '@app-components/Reviews.vue';
import { useToast } from '@app-utils/toastUtils.js';

const store = useStore();
const route = useRoute();
const router = useRouter();
const showToast = useToast();

const randomProductIds = ref([]);

const isSignedIn = computed(() => store.getters['auth/isSignedIn']);
const user = computed(() => store.getters['auth/user']);
const allProducts = computed(() => store.getters['products/allProducts']);

const product = computed(() => {
  const productId = route.params.id;
  return allProducts.value.find(product => product.id === parseInt(productId));
});

const wishlist = computed(() => store.getters['user/userWishlist']);
const isProductInWishlist = computed(() => {
  return wishlist.value.includes(product.value?.id);
});

const fetchProducts = () => store.dispatch('products/fetchProducts');
const fetchWishlist = () => store.dispatch('user/fetchUserWishlist');
const addToWishlist = (productId) => store.dispatch('user/addToWishlist', productId);
const removeFromWishlist = (productId) => store.dispatch('user/removeFromWishlist', productId);

const addToCart = (product) => store.dispatch('cart/addToCart', product);
const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value);
    showToast({ message: 'Item added to basket', type: 'success', repeat: true });
  }
};

const basketProducts = computed(() => store.getters['cart/userCart']);
const basketProduct = computed(() => {
  return basketProducts.value.find(item => item.id === product.value.id);
});

const incrementQuantity = (product) => {
  store.dispatch('cart/addToCart', { ...product, quantity: 1 });
  showToast({ message: 'Quantity updated', type: 'success'});
};

const decrementQuantity = (product) => {
  if (product.quantity > 1) {
    store.dispatch('cart/decrementFromCart', product);
    showToast({ message: 'Quantity updated', type: 'success'});
  } else {
    store.dispatch('cart/removeFromCart', product.id);
    showToast({ message: 'Item removed from basket', type: 'success', repeat: true});
  }
};

const updateQuantity = (product) => {
  if (product.quantity === 0 || product.quantity === '') {
    store.dispatch('cart/removeFromCart', product.id);
    showToast({ message: 'Item removed from basket', type: 'success'});
  } else {
    store.dispatch('cart/updateCartItemQuantity', product);
    showToast({ message: 'Quantity updated', type: 'success'});
  }
};

const handleToggleWishlist = () => {
  if(!isSignedIn.value) {
    showToast({ message: 'Please sign in to use this feature', type: 'info' });
    return;
  }
  if (product.value && user.value.id) {
    if (isProductInWishlist.value) {
      removeFromWishlist(product.value.id);
      showToast({ message: 'Item removed from wishlist', type: 'success', repeat: true });
    } else {
      addToWishlist(product.value.id);
      showToast({ message: 'Item added to wishlist', type: 'success', repeat: true });
    }
  }
};

const updateRandomProductIds = () => {
  randomProductIds.value = getRandomProductIds(allProducts.value, 5);
};

onMounted(async () => {
  if (!allProducts.value.length) {
    await fetchProducts();
  }
  await fetchWishlist();  // Fetch wishlist on component mount
  updateRandomProductIds();
});
</script>