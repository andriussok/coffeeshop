<template>  
  <div class="flex min-h-full flex-1 flex-col justify-start py-12 sm:px-6 lg:px-8 bg-primary-900/50">
    <div class="bg-coffee absolute w-full h-full top-0 left-0 z-[-1]"></div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">Create your account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form @submit.prevent="signup" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label for="password_confirm" class="block text-sm font-medium leading-6 text-gray-900">Password Confirm</label>
            <div class="mt-2">
              <input v-model="passwordConfirm" id="password_confirm" name="password_confirm" type="password" autocomplete="false" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="termsandconditions" required name="termsandconditions" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <label for="termsandconditions" class="ml-3 block text-sm leading-6 text-gray-900">Accept the <button type="button" class="underline">Terms and Conditions</button></label>
            </div>
          </div>
  
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Register</button>
          </div>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p class="mt-8 text-sm text-gray-500">
          Already have an account?
          {{ ' ' }}
          <router-link :to="{path: '/signin'}" class="font-semibold leading-6 text-primary hover:text-primary-400 hover:underline">Sign in</router-link>
        </p>
  
        
      </div>
  
      <p class="mt-10 text-center text-sm text-gray-100">
        Need help?
        {{ ' ' }}
        <a href="#" class="font-semibold leading-6 text-primary hover:text-primary-400 hover:underline">Contact support</a>
      </p>
    </div>
  </div>  
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { useToast } from '@app-utils/toastUtils.js';
  
  const store = useStore();
  const router = useRouter();
  const showToast = useToast();
  
  const email = ref(''); // username == email
  const password = ref('');
  const passwordConfirm = ref('');
  const errorMessage = ref('');

  const signup = async () => {
    if (password.value !== passwordConfirm.value) {
      errorMessage.value = 'Passwords do not match!';
      return;
    }
    try {
      await store.dispatch('auth/signup', { username: email.value, email: email.value, password: password.value });
      router.push('/signin'); // Redirect to login page for email confirmation
      showToast({ message: 'User registered, please sign in', type: 'success'});
      errorMessage.value = '';
    } catch (e) {
      errorMessage.value = e.message;
    }
  };
</script>
  
<style scoped>
  .error {
    color: red;
  }
</style>
  