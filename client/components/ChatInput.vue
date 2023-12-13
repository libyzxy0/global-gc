<template>
  <div class="fixed flex flex-row bottom-0 w-full h-14 border-2 border-t borser-gray-200 bg-white">
    <div class="flex flex-row justify-between items-center h-full w-auto mx-2">
      <input type="file" ref="selectFile" style="display: none" @change="handleFileChange" />
      <IconsChevronRight
        :class="!hideActions ? 'opacity-0 hidden' : 'opacity-100 transition-opacity'"
        @click="showActions"
      />
      <IconsPlus
        class="mx-1 opacity-0 transition-opacity"
        :class="hideActions ? 'hidden' : 'block opacity-100'"
      />
      <IconsCamera
        class="mx-2 opacity-0 transition-opacity"
        :class="hideActions ? 'hidden' : 'block opacity-100'"
      />
      <IconsImage
        @click="uploadImage"
        class="mx-2 opacity-0 transition-opacity"
        :class="[(hideActions ? 'hidden' : 'block opacity-100'), (attachment.length > 0 ? 'stroke-green-400' : '')]"
        :loading="waitImage ? 'y' : ''"
      />
      <IconsMicrophone
        class="mx-1 opacity-0 transition-opacity"
        :class="hideActions ? 'hidden' : 'block opacity-100'"
      />
    </div>

    <div class="flex items-center h-full">
      <textarea
        v-model="message"
        rows="1"
        :cols="hideActions ? '35.9' : '20'"
        class="block py-2 px-4 rounded-full border border-gray-300 outline-none resize-none text-[15px] overflow-hidden font-medium gfont-quicksand transition-all duration-300 ease-in-out bg-gray-50 text-gray-900"
        placeholder="Write a message..." 
      ></textarea>
      <button @click="handleSend" class="flex justify-center items-center w-7 h-7 mx-4">
        <img class="w-8 h-8" :class="message ? 'hidden' : '' || attachment.length > 0? 'hidden' : ''" src="~/assets/images/thumb.png" />
        <IconsSend :class="message ? '' : 'hidden' || attachment.length > 0? '' : 'hidden'" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  short_name: String,
  id: String,
  profile_pic: String,
});

const message = ref('');
const waitImage = ref(false);
const attachment = ref([]);
const hideActions = ref(false);
const socket = useSocket();

// Hide action buttons if message exists
watch(message, (newValue) => {
  hideActions.value = newValue !== '';
});

// Handle send message
const handleSend = async () => {
  socket.emit('make event', {
    type: 'message',
    user: {
      short_name: props.short_name || 'Unknown',
      id: props.id || '0',
      profile_pic: props.profile_pic || 'https://http.cat/404',
    },
    message: {
      body: message.value,
      attachments: attachment.value
    },
  });
  message.value = '';
  attachment.value = [];
};

const showActions = () => {
  hideActions.value = false;
};

const selectFile = ref(null);

const uploadImage = () => {
  selectFile.value.click();
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  const { name, type, size } = file;
  waitImage.value = true;
  const { success, data } = await useFileStorage(file);
  attachment.value.push(`https://file-api.libyzxy0.repl.co/get/${name}`);
  console.log(attachment.value)
  waitImage.value = false;
};
</script>