import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.css';

const app = createApp(App);

store.dispatch('auth/initializeAuth').then(() => {
  app.use(store);
  app.use(router);
  app.mount('#app');
});