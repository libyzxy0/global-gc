<template>
  <div class="flex justify-start w-full mt-3">
      <div class="flex flex-col">
        <p class="text-[13px] flex justify-start font-medium mx-[4rem]">{{ user }}</p>
        <div class="flex flex-row items-center">
          <img :src="profile_pic" class="w-10 h-10 rounded-full ml-2 border-2 border-gray-300">
          
          <div v-if="!attachment" class="bg-gray-600 flex justify-center items-center rounded-3xl shadow mx-2 min-h-[2.5rem] max-w-[80%]">
        <h1 class="text-[15px] font-medium text-gray-900 px-4 py-2 text-white break-all">{{ message }}</h1>
      </div>
      
      <div v-if="attachment && attachment.type == 'image'" class="w-auto h-auto mx-2">
       <img :src="attachment.url" class="h-auto w-auto max-w-[16rem] max-h-[16rem] rounded-lg shadow" @error="(e) => e.target.src = 'https://http.cat/404'">
      </div>
      
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
  defineProps({
    user: String, 
    message: String, 
    profile_pic: String, 
    attachment: String
  })
</script>