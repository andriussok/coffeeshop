<!-- src/components/Toast.vue -->
<template>
  <div
    v-show="visible"
    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
    :class="[toastBgColor]"
    >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <CheckCircleIcon v-if="type === 'success'" class="h-6 w-6 text-green-400" aria-hidden="true" />
          <XMarkIcon v-if="type === 'error'" class="h-6 w-6 text-red-400" aria-hidden="true" />
          <InformationCircleIcon v-if="type === 'info'" class="h-6 w-6 text-blue-400" aria-hidden="true" />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900">{{ message }}</p>
        </div>
        <div class="ml-4 flex flex-shrink-0">
          <button type="button" @click="dismiss" class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
            <span class="sr-only">Close</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { CheckCircleIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { useStore } from 'vuex';

const props = defineProps({
  message: String,
  type: String,
  id: Number,
  dismissible: {
    type: Boolean,
    default: false,
  },
  autoDismiss: {
    type: Boolean,
    default: true,
  },
  repeat: {
    type: Boolean,
    default: false,
  }
});

const store = useStore();
const visible = ref(true);

const toastBgColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-100';
    case 'error':
      return 'bg-red-100';
    case 'info':
      return 'bg-blue-100';
    default:
      return 'bg-white';
  }
});

const dismiss = () => {
  visible.value = false;
  setTimeout(() => {
    store.dispatch('toast/removeToast', props.id);
  }, 500);  // Allow the transition to complete
};

onMounted(() => {
  if (props.autoDismiss) {
    setTimeout(dismiss, 5000);
  }
});
</script>
