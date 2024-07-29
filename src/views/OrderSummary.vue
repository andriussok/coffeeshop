<template>
  <div class="bg-white">
    <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="max-w-xl">
        <h1 class="text-base font-medium text-primary-600">Thank you!</h1>
        <p class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">It's on the way!</p>
        <p class="mt-2 text-base text-gray-500">Your order #{{order.id}} is ready for shipping and will be with you soon.</p>

        <dl class="mt-12 text-sm font-medium">
          <dt class="text-gray-900">Tracking number</dt>
          <dd class="mt-2 text-primary-600">{{[...order.id].reverse().join('')}}</dd>
        </dl>
        
        <div class="mt-12">
          <router-link v-if="isSignedIn && user.verified" to="/account/orders" class="w-50 inline-block text-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50">
            My Orders
          </router-link>
          <router-link v-else-if="!isSignedIn && order.userId !== 'guest'" to="/signin" class="w-50 inline-block text-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50">
            Sign In to see Orders
          </router-link>
          <router-link v-else to="/signup" class="w-50 inline-block text-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50">
            Create your account
          </router-link>
          <p v-if="!isSignedIn && order.userId === 'guest'" class="mt-2 text-sm text-gray-600">
            For easier order management, create your account here.
          </p>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isSignedIn = computed(() => store.getters['auth/isSignedIn']);
const user = computed(() => store.getters['auth/user']);
const order = computed(() => store.getters['checkout/checkoutData']);

</script>