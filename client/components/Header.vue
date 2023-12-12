<template>
  <div class="fixed top-0 w-full h-14 shadow-md bg-white border-b border-1 border-gray-400">
    <div class="flex items-center flex-row h-14">
      <img class="rounded-full h-10 w-10 border-2 border-emerald-400 mx-4" :src="profile">
      <h1 class="font-medium text-xl">{{ name }}</h1>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    name: String, 
    profile: String
  })
</script>