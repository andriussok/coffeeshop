<template>
  <div class="relative bg-primary-900 isolate mt-16 py-16 sm:py-24 lg:py-32">
    <div class="bg-coffee absolute w-full h-full top-0 left-0 z-[-1] opacity-25">1</div>
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
      <div class="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7">
        <h2 class="inline sm:block lg:inline xl:block">Want product news and updates?</h2>
        {{ ' ' }}
        <p class="inline sm:block lg:inline xl:block">Sign up for our newsletter.</p>
      </div>
      <form ref="subscribeForm" @submit.prevent="handleSubscribeSubmit" class="w-full max-w-md lg:col-span-5 lg:pt-2">
        <div class="flex gap-x-4">
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required="" class="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/75 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6" placeholder="Enter your email" />
          <button type="submit" class="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Subscribe</button>
        </div>
        <p class="mt-4 text-sm leading-6 text-gray-300">We care about your data. Read our <a href="#" class="font-semibold text-white hover:text-primary-50">privacy&nbsp;policy</a>.</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from '@app-utils/toastUtils.js'

const showToast = useToast();

const subscribeForm = ref(null);

const handleSubscribeSubmit = () => {
  showToast({ message: 'Woho, you subscribed!', type: 'success' });
  subscribeForm.value.reset();
};

</script>