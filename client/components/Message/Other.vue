<template>
  <div class="flex justify-start w-full mt-3">
      <div class="flex flex-col">
        <p class="text-[13px] flex justify-start font-medium mx-[4rem]">{{ user }}</p>
        <div class="flex flex-row items-center">
          <img :src="profile_pic" class="w-10 h-10 rounded-full ml-2 border-2 border-gray-300">
          <div class="bg-gray-600 flex justify-center items-center w-auto rounded-full shadow mx-2 h-10">
        <h1 class="text-[15px] font-medium text-gray-900 p-4 text-white">{{ message }}</h1>
      </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
  defineProps({
    user: String, 
    message: String, 
    profile_pic: String
  })
</script>