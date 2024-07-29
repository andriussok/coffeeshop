// src/utils/toast.js
import { useStore } from 'vuex';

export function useToast() {
  const store = useStore();
  return (toast) => {
    store.dispatch('toast/showToast', toast);
  };
}
