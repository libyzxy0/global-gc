<template>
  <div class="fixed flex flex-row bottom-0 w-full h-14 border-2 border-t borser-gray-200 bg-white">
    <div class="flex flex-row justify-between items-center h-full w-auto mx-2">
  <IconsChevronRight :class="!hideActions ? 'opacity-0 hidden' : 'opacity-100 transition-opacity'" @click="showActions"/>
  <IconsPlus class="mx-1 opacity-0 transition-opacity" :class="hideActions ? 'hidden' : 'block opacity-100'" />
  <IconsCamera class="mx-2 opacity-0 transition-opacity" :class="hideActions ? 'hidden' : 'block opacity-100'" /> 
  <IconsImage class="mx-2 opacity-0 transition-opacity" :class="hideActions ? 'hidden' : 'block opacity-100'" />
  <IconsMicrophone class="mx-1 opacity-0 transition-opacity" :class="hideActions ? 'hidden' : 'block opacity-100'" />
</div>


    <div class="flex items-center h-full">
      <textarea v-model="message"
          rows="1"
          :cols="hideActions ? '35.9' : '20'"
          class="block py-2 px-4 text-gray-900 bg-gray-50 rounded-full border border-gray-300 outline-none resize-none text-[15px] overflow-hidden font-medium gfont-quicksand transition-all duration-300 ease-in-out"
          placeholder="Write a message...">
</textarea>
      <button @click="handleSend" class="flex justify-center items-center w-7 h-7 mx-4">
        <img class="w-8 h-8" :class="hideActions ? 'hidden' : ''" src="~/assets/images/thumb.png">
        <IconsSend :class="hideActions ? '' : 'hidden'" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
  const message = ref("");
  let hideActions = ref(false);
  
  //Hide action buttons it message exist
  watch(message, (newValue) => {
    hideActions.value = newValue !== "";
  });
  
  //Handle send message 
  const handleSend = () => {
    //Some logics here
  }
  const showActions = () => {
    hideActions.value = false;
  }
</script>