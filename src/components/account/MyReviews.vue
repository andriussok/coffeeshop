<template>
  <div class="lg:col-span-7 lg:col-start-6 lg:mt-0">
    <h3 class="sr-only">My reviews</h3>

    <h1 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Reviews</h1>
    <p class="mt-1 text-sm leading-6 text-gray-500">Your reviews about products.</p>
    <div v-if="reviewsWithProductDetails.length" class="flow-root">
      <div class="divide-y divide-gray-200">
        <div
          v-for="review in reviewsWithProductDetails"
          :key="review.id"
          class="py-8"
        >
          <div class="flex flex-col items-start relative gap-10 md:flex-row">
            <div class="w-full md:w-36">
              <ProductCard
                :product="review.product"
                :minimalMode="true"
              />
            </div>

            <div class="flex flex-col items-start">
              
              <div class="flex flex-col gap-y-1">
                <h4 class="text-sm font-bold text-gray-900">
                  {{ review.author }}
                </h4>
                <div class="mt-1 flex items-center">
                  <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[
                      review.rating > rating
                        ? 'text-yellow-400'
                        : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                  <span
                    class="text-xs ml-2 text-green-600 font-semibold"
                    v-if="review.verifiedPurchase"
                    >Verified Purchase
                  </span>

                </div>
                <span class="text-xs text-gray-400" v-if="review.timestamp"
                  >{{ formatDate(review.timestamp) }}
                  <span v-if="review.edited">( Edited )</span>
                </span>
                <p class="sr-only">{{ review.rating }} out of 5 stars</p>
              </div>
            

              <div
                class="mt-4 space-y-6 text-base italic text-gray-600"
                v-html="review.content"
              />
            </div>
            <button class="ml-auto text-red-500 text-sm" @click="deleteReview(review.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500 border-b pb-5">No Reviews.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { StarIcon } from "@heroicons/vue/20/solid";
import ProductCard from "@app-components/ProductCard.vue";
import { useToast } from "@app-utils/toastUtils.js";

const store = useStore()
const showToast = useToast();
const reviews = ref([]);

const userId = computed(() => store.getters["auth/user"]?.id);
const products = computed(() => store.getters["products/allProducts"]);

const reviewsWithProductDetails = computed(() => {
  return reviews.value.map((review) => {
    const product =
      products.value.find((product) => product.id === review.productId) || {};
    return {
      ...review,
      product,
    };
  });
});

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const deleteReview = async (reviewId) => {
  if (userId.value && confirm('Are you sure you want to delete your review?')) {
    try {
      await store.dispatch("reviews/deleteReview", {reviewId, userId: userId.value});
      await store.dispatch("reviews/fetchReviewsByUser", userId.value);
      reviews.value = store.getters["reviews/reviewsByUser"](userId.value);
      showToast({ message: 'Your review deleted', type: 'success' });
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  }
};


onMounted(async () => {
  await store.dispatch("products/fetchProducts");
  if (userId.value) {
    store.dispatch("reviews/fetchReviewsByUser", userId.value).then(() => {
      reviews.value = store.getters["reviews/reviewsByUserSorted"](userId.value);
    });
  }
});
</script>
