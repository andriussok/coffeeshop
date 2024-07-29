// src/store/modules/reviews.js

import { getReviewsByProduct, getReviewsByUser, getUserById, addReview, updateReview, deleteReview } from '@app-services/server';

const state = {
  reviews: {},
  userReviews: {},
};

const mutations = {
  SET_REVIEWS(state, { productId, reviews }) {
    state.reviews[productId] = reviews;
  },
  SET_USER_REVIEWS(state, { userId, reviews }) {
    state.userReviews[userId] = reviews;
  },
  ADD_REVIEW(state, review) {
    if (!state.reviews[review.productId]) {
      state.reviews[review.productId] = [];
    }
    state.reviews[review.productId].push(review);
  },
  UPDATE_REVIEW(state, review) {
    if (state.reviews[review.productId]) {
      const index = state.reviews[review.productId].findIndex(r => r.id === review.id);
      if (index !== -1) {
        state.reviews[review.productId].splice(index, 1, review);
      }
    }
  },
  DELETE_REVIEW(state, { reviewId, productId }) {
    if (state.reviews[productId]) {
      const index = state.reviews[productId].findIndex(r => r.id === reviewId);
      if (index !== -1) {
        state.reviews[productId].splice(index, 1);
      }
    }
  },
};

const actions = {
  async fetchReviewsByProduct({ commit }, productId) {
    const reviews = getReviewsByProduct(productId);
    const data = await Promise.all(
      reviews.map(async review => {
        const user = getUserById(review.userId);
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || "Customer review";
        return {
          ...review,
          author: fullName
        };
      })
    );
    commit('SET_REVIEWS', { productId, reviews: data });
  },
  async fetchReviewsByUser({ commit }, userId) {
    const reviews = getReviewsByUser(userId);
    commit('SET_USER_REVIEWS', { userId, reviews });
  },
  async addReview({ commit, dispatch }, review) {
    const existingReview = getReviewsByUser(review.userId).find(r => r.productId === review.productId);
    if (existingReview) {
      // Update existing review
      review.id = existingReview.id; // Ensure we pass the correct id for update
      const updatedReview = updateReview(review);
      commit('UPDATE_REVIEW', updatedReview);
    } else {
      // Add new review
      const newReview = addReview(review);
      commit('ADD_REVIEW', newReview);
    }
    await dispatch('fetchReviewsByProduct', review.productId);
    await dispatch('fetchReviewsByUser', review.userId); // Ensure user reviews are also updated
  },
  async updateReview({ commit, dispatch }, review) {
    const updatedReview = updateReview(review);
    commit('UPDATE_REVIEW', updatedReview);
    await dispatch('fetchReviewsByProduct', review.productId);
    await dispatch('fetchReviewsByUser', review.userId);
  },
  async deleteReview({ commit, dispatch }, { reviewId, userId }) {
    const review = getReviewsByUser(userId).find(r => r.id === reviewId);
    if (review) {
      const result = deleteReview(reviewId);
      if (result) {
        commit('DELETE_REVIEW', { reviewId, productId: review.productId });
        await dispatch('fetchReviewsByProduct', review.productId);
        await dispatch('fetchReviewsByUser', userId); // Ensure user reviews are also updated
      }
      return result;
    }
    return false;
  },
};

const getters = {
  reviewsByProduct: (state) => (productId) => {
    return state.reviews[productId] || [];
  },
  reviewsByProductSorted: (state) => (productId, limit) => {
    const reviews = state.reviews[productId] || [];
    const sortedReviews = reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return limit ? sortedReviews : sortedReviews.slice(0, limit);
  },
  reviewsByUser: (state) => (userId) => {
    return state.userReviews[userId] || [];
  },
  reviewsByUserSorted: (state) => (userId, limit) => {
    const reviews = state.userReviews[userId] || [];
    const sortedReviews = reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return limit ? sortedReviews : sortedReviews.slice(0, limit);
  },
  averageRatingByProduct: (state) => (productId) => {
    const reviews = state.reviews[productId] || [];
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
