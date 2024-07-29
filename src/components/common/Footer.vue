<template>
  <div class="p-6 flex flex-row-reverse items-center justify-between bg-primary-800 text-primary-50">
    <div class="flex items-center justify-center">
      <div class="text-xs">Developer <a class="hover:opacity-75 hover:underline hover:underline-offset-4" href="https://andriuss.lt" target="_blank">andriuss.lt</a></div>
    </div>
    <div class="flex items-center justify-center">
      <div class="copyright text-xs">© <a class="hover:opacity-75 hover:underline hover:underline-offset-4" href="/">CoffeeShop</a> | <span>{{ year }}</span></div>
    </div>
  </div>
</template>

<script setup>
  const year = new Date().getFullYear();
</script>