<template>
  <div class="flex justify-end w-fufl mt-3">
      <div class="flex flex-col">
        <p class="text-[13px] flex justify-end font-medium mx-5">{{ user }}</p>
        <div class="bg-emerald-400 flex justify-center items-center w-auto rounded-full shadow mx-3 h-10">
        <h1 class="text-[15px] font-medium text-gray-900 p-4">{{ message }}</h1>
      </div>
      </div>
    </div>
</template>
<script setup lang="ts">
  defineProps({
    user: String, 
    message: String
  })
</script>