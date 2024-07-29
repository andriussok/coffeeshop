// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex';
import websiteRoutes from './modules/websiteRoutes';
import accountRoutes from './modules/accountRoutes';
import adminRoutes from './modules/adminRoutes';

const routes = [
  ...adminRoutes,
  ...websiteRoutes,
  ...accountRoutes,
  { path: '/:catchAll(.*)', redirect: '/' }
];

const router = createRouter({
  // history: createWebHistory('/coffeeshop/'), // set the base
  history: createWebHistory(''),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (to.path.startsWith('/account') && !store.getters['auth/isSignedIn']) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
