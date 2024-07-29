<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 xl:hidden" @close="$emit('close-sidebar')">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="$emit('close-sidebar')">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-100 px-6 ring-1 ring-gray-300">
                <div class="flex h-16 shrink-0 items-center">
                  <router-link :to="{ path: `/`}" class="-m-1.5 p-1.5">
                    <span class="font-black text-primary-800">CoffeeShop</span>
                  </router-link>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <router-link :to="item.href" @click="$emit('close-sidebar')" :class="[item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                            <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </router-link>
                        </li>
                      </ul>
                    </li>
                    <li class="-mx-6 mt-auto">
                      <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-200">
                        <UserIcon class="w-8"/>
                        <span class="sr-only">Your profile</span>
                        <span aria-hidden="true">Admin acc</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-50/50 px-6 ring-1 ring-primary-300">
        <div class="flex h-16 shrink-0 items-center">
          <router-link :to="{ path: `/`}" class="-m-1.5 p-1.5">
            <span class="font-black text-primary-800">CoffeeShop</span>
          </router-link>
        </div>
        
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <router-link :to="item.href" :class="[item.current ? 'bg-primary-200 text-gray-900' : 'text-gray-700 hover:bg-primary-200 hover:text-gray-900', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="-mx-6 mt-auto">
              <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-primary-200">
                <UserCircleIcon class="w-8 stroke-1"/>
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">Admin Acc</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import {
  ChartBarSquareIcon,
  FolderIcon,
  CubeIcon,
  UserIcon,
  StarIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { Bars3Icon } from '@heroicons/vue/20/solid';

const props = defineProps({ sidebarOpen: Boolean });

const route = useRoute();

const navigation = ref([
  { name: 'Stats', href: '/admin/stats', icon: ChartBarSquareIcon, current: false },
  { name: 'Products', href: '/admin/products', icon: FolderIcon, current: false },
  { name: 'Orders', href: '/admin/orders', icon: CubeIcon, current: false },
  { name: 'Users', href: '/admin/users', icon: UserIcon, current: false },
  // { name: 'Reviews', href: '/admin/reviews', icon: StarIcon, current: false },
  // { name: 'Wishlists', href: '/admin/wishlists', icon: HeartIcon, current: false },
  // { name: 'Carts', href: '/admin/carts', icon: ShoppingBagIcon, current: false },
]);

const updateCurrentNavigation = () => {
  navigation.value.forEach(item => {
    item.current = item.href === route.path;
  });
};

watch(route, updateCurrentNavigation, { immediate: true });
</script>
