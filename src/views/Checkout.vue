<template>
  <main class="lg:flex lg:min-h-full lg:flex-row-reverse">
    <h1 class="sr-only">Checkout</h1>

    <!-- Mobile order summary -->
    <section aria-labelledby="order-heading" class="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
      <Disclosure as="div" class="mx-auto max-w-lg" v-slot="{ open }">
        <div class="flex items-center justify-between">
          <h2 id="order-heading" class="text-lg font-medium text-gray-900">Your Order</h2>
          <DisclosureButton class="font-medium text-primary-600 hover:text-primary-500">
            <span v-if="open">Hide full summary</span>
            <span v-if="!open">Show full summary</span>
          </DisclosureButton>
        </div>

        <DisclosurePanel>
          <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
            <li v-for="(product, productIdx) in products" :key="product.id" class="flex py-6">
              <div class="flex-shrink-0">
                <img :src="product.image_url" :alt="product.name" class="border h-24 w-24 rounded-md object-cover object-center" />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <router-link :to="{path:`/product/${product.id}`}" class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</router-link>
                      </h3>
                    </div>
                    
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ formatPrice(product.price) }}</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <!-- Quantity selector -->
                    <div class="relative flex items-center max-w-[8rem]">
                      <button @click="decrementQuantity(product)" type="button" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input type="text" v-model="product.quantity" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" />
                      <button @click="incrementQuantity(product)" type="button" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>

                    <div class="absolute right-0 top-0">
                      <button @click="removeFromCart(product)" type="button" class="-m-2 text-sm inline-flex p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Remove</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <dl class="mt-10 space-y-6 text-sm font-medium text-gray-500">
            <div class="flex justify-between">
              <dt>Subtotal</dt>
              <dd class="text-gray-900">{{ formatPrice(subtotal) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Taxes</dt>
              <dd class="text-gray-900">{{ formatPrice(tax) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Shipping</dt>
              <dd class="text-gray-900">{{ formatPrice(shipping) }}</dd>
            </div>
          </dl>
        </DisclosurePanel>

        <p class="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
          <span class="text-base">Total</span>
          <span class="text-base">{{ formatPrice(total) }}</span>
        </p>
      </Disclosure>
    </section>

    <!-- Order summary -->
    <section aria-labelledby="summary-heading" class="hidden w-full max-w-md flex-col bg-gray-50 lg:flex">
      <h2 id="summary-heading" class="sr-only">Order summary</h2>

      <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
            <li v-for="product in products" :key="product.id" class="flex p-6">
              <div class="flex-shrink-0">
                <img :src="product.image_url" :alt="product.name" class="border h-24 w-24 rounded-md object-cover object-center" />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative flex flex-col gap-2">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <router-link :to="{path:`/product/${product.id}`}" class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</router-link>
                      </h3>
                    </div>
                    
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ formatPrice(product.price) }}</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <!-- Quantity selector -->
                    <div class="relative flex items-center max-w-[8rem]">
                      <button @click="decrementQuantity(product)" type="button" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                        </svg>
                      </button>
                      <input type="text" v-model="product.quantity" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" />
                      <button @click="incrementQuantity(product)" type="button" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                        <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                        </svg>
                      </button>
                    </div>

                    <div class="absolute right-0 top-0">
                      <button @click="removeFromCart(product)" type="button" class="-m-2 text-sm inline-flex p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Remove</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

      <div class="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
        <dl class="mt-10 space-y-6 text-sm font-medium text-gray-500">
          <div class="flex justify-between">
            <dt>Subtotal</dt>
            <dd class="text-gray-900">{{ formatPrice(subtotal) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt>Taxes</dt>
            <dd class="text-gray-900">{{ formatPrice(tax) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt>Shipping</dt>
            <dd class="text-gray-900">{{ formatPrice(shipping) }}</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
            <dt>Total</dt>
            <dd class="text-base">{{ formatPrice(total) }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Checkout form -->
    <section aria-labelledby="payment-heading" class="flex-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0">
      <h2 id="payment-heading" class="sr-only">Payment and shipping details</h2>

      <div class="mx-auto max-w-lg lg:pt-16">
        <div v-if="!isSignedIn" class="mx-auto max-w-lg pb-16">
          Have an account? <router-link :to="{path:'/signin'}" class="text-primary font-bold underline">Sign in</router-link>
          <br>Or continue as a guest.
        </div>
        
        <button @click="handleApplePayCheckout" type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
          <span class="sr-only">Pay with Apple Pay</span>
          <svg class="h-5 w-auto" fill="currentColor" viewBox="0 0 50 20">
            <path d="M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z" />
          </svg>
        </button>

        <div class="relative mt-8">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-200" />
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-4 text-sm font-medium text-gray-500">or</span>
          </div>
        </div>

        <form @submit.prevent="handleCheckout" class="mt-6">
          <div class="grid grid-cols-12 gap-x-4 gap-y-6">
            
          </div>
          <div class="grid grid-cols-12 gap-x-4 gap-y-6">
            <div class="col-span-full">
              <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input v-model="email" type="email" required id="email-address" name="email-address" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div v-if="!isSignedIn" class="col-span-full flex space-x-2">
              <div class="flex h-5 items-center">
                <input v-model="checkoutCreateNewAccount" id="create-account" name="create-account" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              </div>
              <label for="create-account" class="text-sm font-medium text-gray-900">Create account?</label>
            </div>

            
            <div v-if="checkoutCreateNewAccount" class="col-span-full">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input required type="text" id="password" name="password" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>
            <div v-if="checkoutCreateNewAccount" class="col-span-full">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div class="mt-1">
                <input required type="text" id="confirmPassword" name="confirmPassword" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-6">
              <label for="fname" class="block text-sm font-medium text-gray-700">First name</label>
              <div class="mt-1">
                <input v-model="firstName" type="text" id="fname" name="fname" autocomplete="given-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-6">
              <label for="lname" class="block text-sm font-medium text-gray-700">Last Name</label>
              <div class="mt-1">
                <input v-model="lastName" type="text" id="lname" name="lname" autocomplete="family-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <!-- <div class="col-span-full">
              <label for="name-on-card" class="block text-sm font-medium text-gray-700">Name on card</label>
              <div class="mt-1">
                <input type="text" id="name-on-card" name="name-on-card" autocomplete="cc-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="card-number" class="block text-sm font-medium text-gray-700">Card number</label>
              <div class="mt-1">
                <input type="text" id="card-number" name="card-number" autocomplete="cc-number" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-8 sm:col-span-9">
              <label for="expiration-date" class="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
              <div class="mt-1">
                <input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-4 sm:col-span-3">
              <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
              <div class="mt-1">
                <input type="text" name="cvc" id="cvc" autocomplete="csc" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <div class="mt-1">
                <input type="text" id="address" name="address" autocomplete="street-address" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full sm:col-span-4">
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <div class="mt-1">
                <input type="text" id="city" name="city" autocomplete="address-level2" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full sm:col-span-4">
              <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
              <div class="mt-1">
                <input type="text" id="region" name="region" autocomplete="address-level1" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full sm:col-span-4">
              <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
              <div class="mt-1">
                <input type="text" id="postal-code" name="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
              </div>
            </div> -->
          </div>

          <div class="mt-6 flex space-x-2">
            <div class="flex h-5 items-center">
              <input id="same-as-shipping" name="same-as-shipping" type="checkbox" checked="" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            </div>
            <label for="same-as-shipping" class="text-sm font-medium text-gray-900">Billing address is the same as shipping address</label>
          </div>

          <button type="submit" class="mt-6 w-full rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Pay {{ formatPrice(total) }}</button>

          <p class="mt-6 flex justify-center text-sm text-gray-500">
            <LockClosedIcon class="mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            Secure payments
          </p>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { LockClosedIcon } from '@heroicons/vue/20/solid'

import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from '@app-utils/toastUtils.js';

const store = useStore();
const router = useRouter();
const showToast = useToast();

const products = computed(() => store.getters['cart/userCart']);
const checkoutSuccess = computed(() => store.getters['checkout/checkoutSuccess']);
const user = computed(() => store.getters['auth/user']);
const isSignedIn = computed(() => store.getters['auth/isSignedIn']);

const email = ref(''); // username
const firstName = ref('');
const lastName = ref('');
const checkoutCreateNewAccount = ref(false) // create new account?

const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

const subtotal = computed(() => {
  const value = products.value.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  return roundToTwoDecimals(value);
});

const shipping = 5.00;

const tax = computed(() => {
  const value = (subtotal.value + shipping) * 0.20;
  return roundToTwoDecimals(value);
});

const total = computed(() => {
  const value = subtotal.value + shipping + tax.value;
  return roundToTwoDecimals(value);
});

const formatPrice = (price) => {
  return `£${Number(price).toFixed(2)}`;
};

const incrementQuantity = (product) => {
  store.dispatch('cart/addToCart', { ...product, quantity: 1 });
};

const decrementQuantity = (product) => {
  if (product.quantity > 1) {
    store.dispatch('cart/decrementFromCart', product);
  } else {
    removeFromCart(product);
  }
};

const removeFromCart = (product) => {
  if(product.id){
    store.dispatch('cart/removeFromCart', product.id);
  }
};

const handleApplePayCheckout = () => {
  if(isSignedIn.value) {
    handleCheckout();
  } else {
    showToast({ message: 'Currently this payment method available to registered users only', type: 'error' });
  }
}

const handleCheckout = async () => {
  
  if (checkoutCreateNewAccount.value && !isSignedIn.value && password.value !== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }
  let userId = isSignedIn.value ? user.value.id : 'guest';

  if (checkoutCreateNewAccount.value && !isSignedIn.value) {
    try {
      // Create the user account first
      await store.dispatch('auth/signup', {
        username: email.value,
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      });
      // Retrieve the newly created user
      const newUser = store.getters['auth/user'];
      userId = newUser.id;
    } catch (error) {
      console.error('Failed to create account:', error);
      return;
    }
  }

  const order = {
    id: `${Date.now()}`, // Unique order ID
    userId: userId,
    email: email.value,
    items: products.value,
    subtotal: subtotal.value,
    shipping,
    tax: tax.value,
    total: total.value,
    status: 'Pending', // Initial order status
    createdAt: new Date().toISOString(),
    updatedAt: '',
  };

  store.dispatch('orders/addUserOrder', order).then(() => {
    store.dispatch('checkout/setCheckoutSuccess', true); // Set checkout success to true
    store.dispatch('checkout/setCheckoutData', order); // Store checkout data in Vuex
    store.dispatch('cart/clearCart', null, { root: true }); // Clear the cart after order is placed
    router.push('/order-summary');
  }).catch(error => {
    console.error('Error placing order:', error);
  });

};

store.dispatch('cart/fetchUserCart');

onMounted(() => {
  if (isSignedIn.value) {
    email.value = user.value.username;
    firstName.value = user.value.firstName;
    lastName.value = user.value.lastName;
  }
});

watch(products, (newProducts) => {
  if (newProducts.length === 0 && !checkoutSuccess.value) {
    router.push('/cart');
  }
}, { immediate: true });

</script>