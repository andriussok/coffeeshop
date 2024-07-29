<template>
<div class="flex min-h-full flex-1 flex-col justify-start py-12 sm:px-6 lg:px-8 bg-primary-900/50">
  <div class="bg-coffee absolute w-full h-full top-0 left-0 z-[-1]"></div>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <div v-if="!showVerificationPrompt">
        <form @submit.prevent="signin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="username" id="username" name="username" type="email" autocomplete="username" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
            </div>

            <div class="text-sm leading-6">
              <a href="#" class="font-semibold text-primary hover:text-primary-400 hover:underline">Forgot password?</a>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Sign in</button>
          </div>
        </form>
        <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

        <p class="mt-8 text-sm text-gray-500">
          Don't have an account yet?
          {{ ' ' }}
          <router-link :to="{path: '/signup'}" class="font-semibold leading-6 text-primary hover:text-primary-400 hover:underline">Create account</router-link>
        </p>
      </div>
      <div v-if="showVerificationPrompt" class="py-6">
        <h3 class="text-xl font-medium">Verify Email</h3>
        <div>
          <label for="verification" class="block text-sm font-medium leading-6 text-gray-900">Please enter the verification code sent to your email:</label>
          <div class="mt-2">
            <input v-model="verificationCode" id="verification" placeholder="6 digit code (type any numbers)" name="verification" type="text" required="" maxlength="6" autocomplete="off" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6" />
          </div>
          <div class="flex justify-between">
            <button class="mt-5 underline" type="button">Resend code</button>
            <button class="mt-5" @click="showVerificationPrompt = false" type="button">Cancel</button>
          </div>
        </div>
      </div>
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
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from '@app-utils/toastUtils.js';

const store = useStore();
const router = useRouter();
const showToast = useToast();

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const showVerificationPrompt = ref(false);
const verificationCode = ref('');


const signin = async () => {
  try {
    await store.dispatch('auth/signin', { username: username.value, password: password.value });
    router.push('/'); // Redirect to the home page after successful login
  } catch (e) {
    if (e.message === 'User not verified') {
      showToast({ message: 'Please verify your account', type: 'info'});
      showVerificationPrompt.value = true;
    } else if (e.message === 'Invalid credentials' || e.message === 'Username does not exist') {
      errorMessage.value = e.message;
      showToast({ message: 'Invalid credentials, please try again', type: 'error'});
    } else  {
      errorMessage.value = e.message;
    }
  }
};

const verifyEmail = async () => {
  if (!/^\d{6}$/.test(verificationCode.value)) {
    showToast({ message: 'Wrong code, please try again', type: 'error', repeat:true});
    verificationCode.value = ''; // Clear the input value
    return;
  }
  try {
    await store.dispatch('auth/verifyUser', { username: username.value });
    showVerificationPrompt.value = false;
    router.push('/'); // Redirect to the home page after successful verification
    showToast({ message: 'Account verified', type: 'success'});
  } catch (e) {
    errorMessage.value = e.message;
  }
};

watch(verificationCode, (newVal) => {
  if (newVal.length === 6) {
    verifyEmail();
  }
});
</script>


<style scoped>
.error {
  color: red;
}
</style>
