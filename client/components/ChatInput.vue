<template>
  <div class="fixed flex flex-row bottom-0 w-full h-14 border-2 border-t border-gray-200 bg-white">
    <div class="flex flex-row justify-between items-center h-full w-auto mx-2">
      <input type="file" accept="image/png, image/gif, image/jpeg" ref="selectImage" style="display: none" @change="handleFileChange"/>
      
      <input type="file" accept="image/png, image/gif, image/jpeg" ref="captureImage" style="display: none" @change="handleFileChange" capture="environment" />
      
      <IconsChevronRight
        :class="!isActions ? 'opacity-0 hidden' : 'opacity-100 transition-opacity'"
        @click="hideActions = false;"
      />
      <IconsPlus
        class="mx-1 opacity-0 transition-opacity"
        :class="isActions ? 'hidden' : 'block opacity-100'"
      />
      <IconsCamera
        class="mx-2 opacity-0 transition-opacity"
        :class="[(isActions ? 'hidden' : 'block opacity-100'), (attachment.length > 0 && attachment[0].action == 'cam' ? 'stroke-green-400' : '')]"
        @click="captureImage.click(); action = 'cam'"
        :loading="waitCam ? 'y' : ''"
      />
      <IconsImage
        @click="selectImage.click(); action = 'img'"
        class="mx-2 opacity-0 transition-opacity"
        :class="[(isActions ? 'hidden' : 'block opacity-100'), (attachment.length > 0 && attachment[0].action == 'img' ? 'stroke-green-400' : '')]"
        :loading="waitImg ? 'y' : ''"
      />
      <IconsMicrophone
        class="mx-1 opacity-0 transition-opacity"
        :class="[(isActions ? 'hidden' : 'block opacity-100'), (isVm ? 'stroke-purple-500' : '')]"
        @click="toggleVoice"
      />
    </div>

    <div class="flex items-center h-full">
      <textarea
        v-model="message"
        rows="1"
        :cols="isActions ? '35.9' : '20'"
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
const socket = useSocket();

const isVm = ref(false);
const isActions = ref(false);

const action = ref('');
const selectImage = ref(null);
const captureImage = ref(null);
const waitCam = ref(false);
const waitImg = ref(false);

const attachment = ref([]);

// Hide action buttons if message exists
watch(message, (newValue) => {
  isActions.value = newValue !== '';
});

// Handle send message
const handleSend = async () => {
  socket.emit('make event', {
    type: 'message',
    user: {
      short_name: props.short_name || 'Unknown',
      id: props.id || '0',
      profile_pic: props.profile_pic,
    },
    message: {
      body: message.value,
      attachments: attachment.value
    },
  });
  message.value = '';
  attachment.value = [];
};

const toggleVoice = () => {
  isVm.value = !isVm.value;
}

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if(action.value == 'cam') {
    waitCam.value = true;
  } else {
    waitImg.value = true;
  }
  const { success, data } = await useFileStorage(file);
  if(success && !!data) {
    attachment.value.push({
      action: action.value, 
      type: "image", 
      url: `https://file-api.libyzxy0.repl.co/get/${data}`
    });
  } else {
    alert('An error occurred while uploading the file')
  }
  waitCam.value = false;
  waitImg.value = false;
  action.value = '';
};
</script>