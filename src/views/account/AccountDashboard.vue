<template>
  <div class="mx-auto max-w-7xl pt-0 lg:flex lg:gap-x-16 lg:px-8">
    <h1 class="sr-only">Account Settings</h1>

    <aside class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          <li v-for="item in secondaryNavigation" :key="item.name">
            <router-link :to="item.href" :class="[item.current ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary', 'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6']">
              <component :is="item.icon" :class="[item.current ? 'text-primary' : 'text-gray-400 group-hover:text-primary', 'h-6 w-6 shrink-0']" aria-hidden="true" />
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <main v-if="user" class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>

import { 
  UserCircleIcon, 
  CubeIcon, 
  HeartIcon, 
  CreditCardIcon,
  Cog6ToothIcon,
  StarIcon,
  ArrowRightStartOnRectangleIcon 
} from '@heroicons/vue/24/outline';

import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const secondaryNavigation = [
  { name: 'Profile', href: '/account/profile', icon: UserCircleIcon, current: false },
  { name: 'Orders', href: '/account/orders', icon: CubeIcon, current: false },
  { name: 'Wishlist', href: '/account/wishlist', icon: HeartIcon, current: false },
  { name: 'Reviews', href: '/account/reviews', icon: StarIcon, current: false },
  { name: 'Payment Method', href: '/account/payment-method', icon: CreditCardIcon, current: false },
  { name: 'Settings', href: '/account/settings', icon: Cog6ToothIcon, current: false },
  { name: 'Sign Out', href: '/signout', icon: ArrowRightStartOnRectangleIcon},
];

const isSignedIn = computed(() => store.getters['auth/isSignedIn']);
const user = computed(() => store.getters['auth/user']);


// Function to update the current property
const updateCurrentNavigation = () => {
  if (secondaryNavigation) {
    secondaryNavigation.forEach(item => {
      item.current = item.href === route.path;
    });
  }
};
// Watch for route changes and update the navigation
watch(route, updateCurrentNavigation, { immediate: true });
// Ensure initial update
updateCurrentNavigation();

const mobileMenuOpen = ref(false);
</script>
