<template>
  <div class="w-full flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold text-emerald-400 mt-10">Global GC</h1>
    <p class="text-md mx-8 my-3 text-center">Chatting, Laughing, and Connecting as One Big Happy Community!</p>
    <div class="mt-5 w-full flex flex-col justify-center items-center">
      <hr class="w-[80%] border-t border-1 border-gray-300 h-1 mb-4">
      <h1 class="text-4xl text-gray-500 font-medium">0</h1>
      <p class="text-gray-500 mt-2 font-medium">Active Users</p>
    </div>
     <div class="mt-5 w-full flex flex-col justify-center items-center">
      <h1 class="text-4xl text-gray-500 font-medium">0</h1>
      <p class="text-gray-500 mt-2 font-medium">Total Messages</p>
       <hr class="w-[80%] border-t border-1 border-gray-300 h-1 mt-4">
    </div>
    <div class="w-full flex flex-col justify-center items-center mt-10">
      <p class="text-center font-medium my-8 mx-10">
        By continuing, you confirm that you've read and agreed to our <a class="text-emerald-400" href="#">Terms of Use</a> and <a class="text-emerald-400" href="#">Privacy Policy</a>.
      </p>
      <button class="bg-emerald-400 py-3 w-[80%] outline-none border-none shadow-md rounded-full font-bold text-[17px] text-white" :disabled="!isReady" @click="() => login()">Continue with Google</button>
      <p class="font-medium text-md mt-24 text-gray-400">© Copyright 2023, Global GC | <a class="text-emerald-400" href="https://libyzxy0.xyz">libyzxy0</a>.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
  let token = useCookie("token");
  (async function() {
    const { success } = await useGoogleAuth(token.value);
    if(success) {
      window.location.href = '/chat';
    }
  })()

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  token.value = response.access_token;
  window.location.href = '/chat';
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