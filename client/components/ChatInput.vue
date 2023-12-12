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
          placeholder="Write a message..."></textarea>
      <button @click="handleSend" class="flex justify-center items-center w-7 h-7 mx-4">
        <img class="w-8 h-8" :class="message ? 'hidden' : ''" src="~/assets/images/thumb.png">
        <IconsSend :class="message ? '' : 'hidden'" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
let props = defineProps({
  short_name: String, 
  id: String, 
  profile_pic: String
})
const message = ref("");
const hideActions = ref(false);
const socket = useSocket();
// Hide action buttons if message exists
watch(message, (newValue) => {
  hideActions.value = newValue !== "";
});

// Handle send message
const handleSend = async () => {
  socket.emit('make event', {
    type: "message",
    user: {
      short_name: props.short_name ? props.short_name : 'Unknown', 
      id: props.id ? props.id : '0', 
      profile_pic: props.profile_pic ? props.profile_pic : 'https://http.cat/404' 
    },
    message: {
      body: message.value,
      attachments: []
    }
  });
  message.value = "";
};

const showActions = () => {
  hideActions.value = false;
};
</script>

