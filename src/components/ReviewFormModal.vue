<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-20">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h3 class="text-lg font-medium text-gray-900">{{ existingReview ? 'Edit your review' : 'Write a review' }}</h3>
      <form @submit.prevent="submitReview">
        <div class="mt-4">
          <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
          <div class="flex items-center space-x-1 mt-2">
            <StarIcon
              v-for="index in 5"
              :key="index"
              :class="{
                'text-yellow-400': tempRating >= index,
                'text-gray-300': tempRating < index,
              }"
              @mouseover="setTempRating(index)"
              @mouseout="clearTempRating"
              @click="setRating(index)"
              class="h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          </div>
        </div>
        <div class="mt-4">
          <label for="content" class="block text-sm font-medium text-gray-700">Review</label>
          <textarea v-model="content" id="content" name="content" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></textarea>
        </div>
        <div class="mt-4 flex justify-end">
          <button v-if="existingReview" type="button" @click="deleteReview" class="mr-auto inline-flex justify-center rounded-md border border-red-500 bg-white py-2 px-4 text-sm font-medium text-red-500 shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <span>Delete</span>
          </button>
          <button type="button" @click="closeModal" class="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Cancel
          </button>
          <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            {{ existingReview ? 'Update Review' : 'Submit Review' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { StarIcon } from '@heroicons/vue/20/solid';
import { useToast } from '@app-utils/toastUtils.js';

const props = defineProps({
  productId: Number,
});
const emit = defineEmits(['close']);

const store = useStore();
const route = useRoute();
const showToast = useToast();

// Reactive references with deferred initialization
const tempRating = ref(5);
const rating = ref(5);
const content = ref('');

const userId = computed(() => store.getters['auth/user'].id);
const existingReview = computed(() => {
  return store.getters['reviews/reviewsByUser'](userId.value).find(review => review.productId === props.productId);
});

const closeModal = () => {
  emit('close');
};

const submitReview = () => {
  const reviewData = {
    userId: userId.value,
    productId: props.productId,
    rating: rating.value,
    content: content.value,
    timestamp: new Date().toISOString(),
  };

  if (existingReview.value) {
    store.dispatch('reviews/updateReview', { ...reviewData, id: existingReview.value.id });
  } else {
    store.dispatch('reviews/addReview', reviewData);
  }

  closeModal();
};

const deleteReview = () => {
  if (confirm('Are you sure you want to delete your review?')) {
    closeModal();
    store.dispatch('reviews/deleteReview', { reviewId: existingReview.value.id, userId: userId.value });
    showToast({ message: 'Your review deleted', type: 'success' });
  }
};

const setTempRating = (value) => {
  tempRating.value = value;
};

const clearTempRating = () => {
  tempRating.value = rating.value;
};

const setRating = (value) => {
  rating.value = value;
};

// Update refs if existingReview
watch(existingReview, (newVal) => {
  if (newVal) {
    tempRating.value = newVal.rating || 5;
    rating.value = newVal.rating || 5;
    content.value = newVal.content || '';
  }
}, { immediate: true });

</script>
