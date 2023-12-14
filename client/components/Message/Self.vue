<template>
  <div class="flex justify-end w-fufl mt-3">
      <div class="flex flex-col">
        <p class="text-[13px] flex justify-end font-medium mx-5">{{ props.user }}</p>
        
        <div v-if="!props.attachment" class="bg-emerald-400 flex justify-center items-center w-auto rounded-full shadow mx-3 h-10">
        <h1 class="text-[15px] font-medium text-gray-900 p-4">{{ props.message }}</h1>
      </div>
      
      <div v-else class="w-auto h-auto mx-5">
       <img :src="props.attachment" class="h-auto w-auto lmax-w-[z16rem] max-h-[16rem] rounded-lg" @error="(e) => e.target.src = 'https://http.cat/404'">
      </div>
      
      </div>
    </div>
</template>
<script setup lang="ts">
  let props = defineProps({
    user: String, 
    message: String, 
    attachment: String
  })
</script>