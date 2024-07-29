<template>
  <header class="bg-white border-b relative">
    <nav class="mx-auto flex items-center justify-between h-[70px] p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <router-link :to="{ path: `/`}" class="-m-1.5 p-1.5">
          <span class="sr-only">Coffee Shop</span>
          <span class="font-black text-primary-800">CoffeeShop</span>
        </router-link>
      </div>
      <div class="flex gap-x-5 lg:hidden">
        
        <!-- Cart -->
        <BagComponent />

        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'text-primary' : 'hover:text-primary', 'text-sm font-semibold leading-6 text-gray-800']">
          {{ item.name }}
        </router-link>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-3">
      
        <Menu v-if="isSignedIn" as="div" class="relative inline-flex">
          
          <MenuButton class="pr-1 -my-1 gap-x-1 inline-flex w-full items-center justify-between rounded-full bg-white text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <UserCircleIcon class="w-7 bg-white rounded-full mix-blend-multiply" />
            <span v-if="user.firstName" class="text-xs max-lg:hidden font-normal">{{ user.firstName }}</span>
            <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </MenuButton>
          
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-8 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }" v-for="item in secondaryNavigation" :key="item.name">
                  <router-link :to="item.href" :class="[(active || item.current) ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary', 'group flex items-center gap-x-2 rounded-md py-1.5 pl-4 pr-3 text-sm font-normal leading-6']">
                    <component :is="item.icon" :class="[(active || item.current) ? 'text-primary' : ' group-hover:text-primary', 'h-4 w-4 shrink-0']" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <div v-else>
          <router-link to="/signin" class="text-sm font-semibold leading-6 text-gray-800 hover:text-gray-500 border rounded-full px-4 py-2">Sign in</router-link>
        </div>

        <!-- Cart -->
        <BagComponent />

      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <span href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Coffee Shop</span>
            <router-link :to="{ path: `/`}">
              <span class="font-black text-primary-800">CoffeeShop</span>
            </router-link>
          </span>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href" @click="mobileMenuOpen = false" :class="[item.current ? 'text-primary' : '', '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-800 hover:bg-gray-50']">
                {{ item.name }}
              </router-link>
            </div>
            <div class="py-6">
              <!-- <router-link v-if="isSignedIn" :to="{ path: `/signout` }" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-800 hover:bg-gray-50">Sign Out</router-link> -->
              <div v-if="isSignedIn">
                <div class="py-1">
                  <div v-for="item in secondaryNavigation" :key="item.name">
                    <router-link :to="item.href" @click="mobileMenuOpen = false" :class="[item.current ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary', 'group flex items-center gap-x-2 rounded-md py-1.5 pr-3 text-sm font-normal leading-6']">
                      <component :is="item.icon" :class="[item.current ? 'text-primary' : ' group-hover:text-primary', 'h-4 w-4 shrink-0']" aria-hidden="true" />
                      {{ item.name }}
                    </router-link>
                  </div>
                </div>
              </div>
              <router-link v-else :to="{ path: `/signin` }" @click="mobileMenuOpen = false" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-800 hover:bg-gray-50">Sign in</router-link>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>

import {
  Menu, MenuButton, MenuItem, MenuItems,
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'

import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  UserIcon,
  HeartIcon,
  CubeIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon} from '@heroicons/vue/20/solid'

import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import BagComponent from '@app-components/BagComponent.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const isSignedIn = computed(() => store.getters['auth/isSignedIn']);
const user = computed(() => store.getters['auth/user']);

const navigation = ref([
  { name: 'Products', href: '/products', current: false },
  { name: 'Company', href: '/company', current: false },
  { name: 'Contact', href: '/contact', current: false },
]);

const secondaryNavigation = ref([
  { name: 'Profile', href: '/account/profile', icon: UserIcon, current: false },
  { name: 'Orders', href: '/account/orders', icon: CubeIcon, current: false },
  { name: 'Wishlist', href: '/account/wishlist', icon: HeartIcon, current: false },
  { name: 'Settings', href: '/account/settings', icon: Cog6ToothIcon, current: false },
  { name: 'Sign Out', href: '/signout', icon: ArrowRightStartOnRectangleIcon, current: false},
]);

onMounted(() => {
  store.dispatch('cart/fetchUserCart');
});

const updateCurrentNavigation = () => {
  navigation.value.forEach(item => {
    item.current = item.href === route.path;
  });
  secondaryNavigation.value.forEach(item => {
    item.current = item.href === route.path;
  });
};
// Watch for route changes and update the navigation
watch(route, updateCurrentNavigation, { immediate: true });
// Ensure initial update
updateCurrentNavigation();

const mobileMenuOpen = ref(false)
</script>