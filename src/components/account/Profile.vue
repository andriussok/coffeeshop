<template>
  <div>
    <h1 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Profile</h1>
    <p class="mt-1 text-sm leading-6 text-gray-500">Details of your profile.</p>

    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
          <router-link to="/account/settings#personal-info" type="button" class="font-semibold text-primary hover:text-primary-600">Update</router-link>
        </dd>
      </div>
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-gray-900">{{ user.username }}</div>
          <router-link to="/account/settings#personal-info" type="button" class="font-semibold text-primary hover:text-primary-600">Update</router-link>
        </dd>
      </div>
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Password</dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-gray-900">{{ '************' }}</div>
          <router-link to="/account/settings#password" type="button" class="font-semibold text-primary hover:text-primary-600">Update</router-link>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const user = computed(() => store.getters['auth/user']);
</script>
