<template>
  <div class="bg-white">
    <div class="pb-16">
      <div class="mx-auto">
        <div class="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Order history</h1>
          <p class="mt-2 text-sm text-gray-500">Check the status of recent orders, manage returns, and discover similar products.</p>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="sr-only">Recent orders</h2>
        <div class="mx-auto">
          <div class="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            <div v-for="order in reversedOrders" :key="order.id" class="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
              <h3 class="sr-only">
                Order placed on <time :datetime="formatDatetime(order.createdAt)">{{ formatDate(order.createdAt) }}</time>
              </h3>

              <div class="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                <dl class="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                  <div>
                    <dt class="font-medium text-gray-900">Order number</dt>
                    <dd class="mt-1 text-gray-500">{{ order.id }}</dd>
                  </div>
                  <div class="hidden sm:block">
                    <dt class="font-medium text-gray-900">Date placed</dt>
                    <dd class="mt-1 text-gray-500">
                      <time :datetime="formatDatetime(order.createdAt)">{{ formatDate(order.createdAt) }}</time>
                    </dd>
                  </div>
                  <div>
                    <dt class="font-medium text-gray-900">Total amount</dt>
                    <dd class="mt-1 font-medium text-gray-900">£{{ order.total }}</dd>
                  </div>
                </dl>

                <Menu as="div" class="relative flex justify-end lg:hidden">
                  <div class="flex items-center">
                    <MenuButton class="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                      <span class="sr-only">Options for order {{ order.number }}</span>
                      <EllipsisVerticalIcon class="h-6 w-6" aria-hidden="true" />
                    </MenuButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a :href="order.href" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a :href="order.invoiceHref" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Invoice</a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>

                <div class="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                  <a :href="order.href" class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    <span>View Order</span>
                    <span class="sr-only">{{ order.id }}</span>
                  </a>
                  <a :href="order.invoiceHref" class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    <span>View Invoice</span>
                    <span class="sr-only">for order {{ order.id }}</span>
                  </a>
                </div>
              </div>

              <!-- Products -->
              <h4 class="sr-only">Items</h4>
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="product in order.items" :key="product.id" class="p-4 sm:p-6">
                  <div class="flex items-center sm:items-start">
                    <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                      <img :src="product.image_url" :alt="product.imageAlt" class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="ml-6 flex-1 text-sm">
                      <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                        <h5>{{ product.name }}</h5>
                        <p class="mt-2 sm:mt-0">£{{ product.price }}</p>
                      </div>
                      <p class="hidden text-gray-500 sm:mt-2 sm:block">{{ product.quantity }} x {{ product.weight }}g</p>
                    </div>
                  </div>

                  <div class="mt-6 sm:flex sm:justify-between">
                    <div class="flex items-center">
                      <CheckCircleIcon class="h-5 w-5 text-green-500" aria-hidden="true" />
                      <p class="ml-2 text-sm font-medium text-gray-500">
                        Delivered
                      </p>
                    </div>

                    <div class="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                      <div class="flex flex-1 justify-center">
                        <router-link :to="{path: `/product/${product.id}`}" class="whitespace-nowrap text-primary-600 hover:text-primary-500">View product</router-link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'

import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

const store = useStore();
const orders = computed(() => store.getters['orders/userOrders']);

// Computed property to reverse the orders array for display
const reversedOrders = computed(() => {
  return orders.value.slice().reverse();
});

// Function to convert ISO date to yyyy-mm-dd
const formatDatetime = (isoDateString) => {
  const date = new Date(isoDateString);
  // Adjust for local timezone
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  // Format as yyyy-mm-dd
  const createdDatetime = localDate.toISOString().split('T')[0];
  return createdDatetime;
}

// Function to convert ISO date to localized format (Jun 18 2024)
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  // Format date according to user's locale
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const createdDate = date.toLocaleDateString(navigator.language, options).replace(',', '');
  return createdDate;
}

// Fetch orders when the component is mounted
onMounted(() => {
  store.dispatch('orders/fetchUserOrders');
});
</script>
