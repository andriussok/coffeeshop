<!-- src/components/ToastContainer.vue -->
<template>
  <!-- Global notification live region -->
  <div aria-live="assertive" class="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 sm:top-36">
    <transition-group
      name="toast-list"
      enter-active-class="transform ease-out duration-300 transition"
      leave-active-class="transform ease-in duration-200 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      tag="div"
      class="flex w-full flex-col lg:flex-col-reverse items-center gap-y-4 sm:items-end"
    >
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        :id="toast.id"
        :dismissible="toast.dismissible"
        :autoDismiss="toast.autoDismiss"
        :repeat="toast.repeat"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Toast from './Toast.vue';

export default {
  components: { Toast },
  computed: {
    ...mapState({
      toasts: state => state.toast.toasts
    })
  }
};
</script>

<style>
.toast-list-move {
  transition: transform 0.5s ease;
}
.toast-list-leave-active {
  position: absolute;
}
</style>