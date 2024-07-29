<template>
  <div>
    <!-- Settings forms -->
    <div class="divide-y divide-black/5">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Settings</h1>
        <p class="mt-1 text-sm leading-6 text-gray-500">Update your profile.</p>
      </div>
      <div id="personal-info" class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-800">Personal Information</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Use a permanent address where you can receive mail.</p>
        </div>

        <form @submit.prevent="updatePersonalInfo" class="md:col-span-2">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-800">First name</label>
              <div class="mt-2">
                <input v-model="firstName" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-800">Last name</label>
              <div class="mt-2">
                <input v-model="lastName" type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-800">Email address</label>
              <div class="mt-2">
                <input v-model="email" id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

          </div>

          <div class="mt-8 flex">
            <button type="submit" class="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Save</button>
          </div>
        </form>
      </div>

      <div id="password" class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-800">Change password</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Update your password associated with your account.</p>
        </div>

        <form @submit.prevent="updatePassword" class="md:col-span-2">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div class="col-span-full">
              <label for="current-password" class="block text-sm font-medium leading-6 text-gray-800">Current password</label>
              <div class="mt-2">
                <input v-model="currentPassword" id="current-password" name="current_password" type="password" autocomplete="off" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="new-password" class="block text-sm font-medium leading-6 text-gray-800">New password</label>
              <div class="mt-2">
                <input v-model="newPassword" id="new-password" name="new_password" type="password" autocomplete="off" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="confirm-password" class="block text-sm font-medium leading-6 text-gray-800">Confirm password</label>
              <div class="mt-2">
                <input v-model="confirmPassword" id="confirm-password" name="confirm_password" type="password" autocomplete="off" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <button type="submit" class="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Save</button>
          </div>
        </form>
      </div>

      <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-800">Log out other sessions</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Please enter your password to confirm you would like to log out of your other sessions across all of your devices.</p>
        </div>

        <form @submit.prevent="signoutOtherSessions" class="md:col-span-2">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div class="col-span-full">
              <label for="logout-password" class="block text-sm font-medium leading-6 text-gray-800">Your password</label>
              <div class="mt-2">
                <input v-model="logoutPassword" id="logout-password" name="password" type="password" autocomplete="off" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <button type="submit" class="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Log out other sessions</button>
          </div>
        </form>
      </div>

      <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-800">Delete account</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.</p>
        </div>

        <form @submit.prevent="deleteAccount" class="flex items-start md:col-span-2">
          <button type="submit" class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600">Yes, delete my account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { useToast } from '@app-utils/toastUtils.js';

const store = useStore();
const router = useRouter();
const showToast = useToast();

const user = computed(() => store.getters['auth/user']);

const firstName = ref(user.value.firstName);
const lastName = ref(user.value.lastName);
const email = ref(user.value.email);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const logoutPassword = ref('');

watch(user, (newValue) => {
  firstName.value = newValue.firstName;
  lastName.value = newValue.lastName;
  email.value = newValue.email;
});

const updatePersonalInfo = async () => {
  try {
    await store.dispatch('auth/updateUser', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
    });
    showToast({ message: 'Profile updated successfully', type: 'success' });
  } catch (error) {
    showToast({ message: 'Failed to update profile', type: 'error' });
  }
}

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    showToast({ message: 'Passwords do not match', type: 'error' });
    return;
  }
  try {
    await store.dispatch('auth/updatePassword', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    });
    showToast({ message: 'Password updated successfully', type: 'success' });
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  } catch (error) {
    showToast({ message: 'Failed to update password', type: 'error' });
  }
}

const signoutOtherSessions = async () => {
  try {
    await store.dispatch('auth/signoutOtherSessions', {
      password: logoutPassword.value
    });
    showToast({ message: 'Signed out from other sessions', type: 'success' });
    logoutPassword.value = '';
  } catch (error) {
    showToast({ message: 'Failed to sign out from other sessions', type: 'error' });
  }
}

const deleteAccount = async () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    try {
      await store.dispatch('auth/deleteUser');
      router.push('/');
      showToast({ message: 'Account Terminated', type: 'success' });
    } catch (error) {
      showToast({ message: 'Failed to delete account', type: 'error' });
    }
  }
}

</script>
