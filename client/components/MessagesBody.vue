<template>
  <div class="flex flex-col w-full h-auto my-[5rem]">
    <template v-for="(message, index) in sortedMessages" :key="message?.message.messageID">
      <MessageSelf
        v-if="message.user.id === props.uid"
        :message="message.message && message.message.body"
        :user="message.user && message.user.short_name"
      />
      <MessageOther
        v-else
        :message="message.message && message.message.body"
        :user="message.user && message.user.short_name"
        :profile_pic="message?.user.profile_pic"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue';
const props = defineProps({
  uid: String
});

const messages = ref([]);
const socket = useSocket();

(async function () {
  const r = await useRetrieveMessage();
  messages.value = r;
})()

onMounted(() => {
  socket.on('event', (event) => {
    if (event.type === 'message') {
      messages.value.push(event);
    }
  });
});

const sortedMessages = computed(() => {
  return messages.value.slice().sort((a, b) => {
    return new Date(a.message.created_at) - new Date(b.message.created_at);
  });
});
</script>
