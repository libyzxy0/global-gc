<template>
  <div class="w-full flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold text-emerald-400 mt-14">Global GC</h1>
    <p class="text-md mx-8 my-3 text-center">Chatting, Laughing, and Connecting as One Big Happy Community!</p>
    <div class="mt-5 w-full flex flex-col justify-center items-center">
      <hr class="w-[80%] border-t border-1 border-gray-300 h-1 mb-4">
      <h1 class="text-4xl text-gray-500 font-medium">0</h1>
      <p class="text-gray-500 mt-2 font-medium">Active Users</p>
    </div>
     <div class="mt-5 w-full flex flex-col justify-center items-center">
      <h1 class="text-4xl text-gray-500 font-medium">{{ msgs }}</h1>
      <p class="text-gray-500 mt-2 font-medium">Total Messages</p>
       <hr class="w-[80%] border-t border-1 border-gray-300 h-1 mt-4">
    </div>
    <div class="w-full flex flex-col justify-center items-center mt-10">
      <p class="text-center font-medium my-8 mx-10">
        By continuing, you confirm that you've read and agreed to our <a class="text-emerald-400" href="#">Terms of Use</a> and <a class="text-emerald-400" href="#">Privacy Policy</a>.
      </p>
      <button class="bg-emerald-400 py-3 w-[80%] outline-none border-none shadow-md rounded-full font-bold text-[17px] text-white flex flex-row justify-center items-center" :disabled="!isReady" @click="() => login()">
        <img src="~/assets/images/google.png [3BC4201].png" class="w-10 h-10">
      Continue with Google</button>
      <p class="font-medium text-md mt-20 text-gray-400">© Copyright 2023, Global GC | <a class="text-emerald-400" href="https://libyzxy0.xyz">libyzxy0</a>.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'Global GC - Chatting, Laughing, and Connecting as One Big Happy Community!',
  ogTitle: 'Global GC - Chatting, Laughing, and Connecting as One Big Happy Community!',
  description: 'Chatting, Laughing, and Connecting as One Big Happy Community!',
  ogDescription: 'Chatting, Laughing, and Connecting as One Big Happy Community!',
  ogImage: 'https://globalgc.libyzxy0.com/favicon.ico',
  twitterCard: 'https://globalgc.libyzxy0.com/favicon.ico',
})
const msgs = ref(0);
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
import { useRouter } from 'vue-router';
const router = useRouter()

const token = useCookie('token');
  (async function() {
    //Message count
    const messages = await useRetrieveMessage();
    msgs.value = messages.length;
  })()

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  token.value = response.access_token;
  setTimeout(() => {
    router.go()
  }, 500)
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // other options
});
</script>