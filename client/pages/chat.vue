<template>
  <Header :name="name" :profile="profile"/>
  <MessagesBody v-if="!!id" :uid="id"/>
  <ChatInput :profile_pic="profile" :short_name="short_name" :id="id" />
</template>
<script setup lang="ts">
  const token = useCookie("token");
  let name = ref("");
  let short_name = ref("")
  let profile = ref("");
  let id = ref("");
  (async function() {
    const { success, data } = await useGoogleAuth(token.value);
    if(!success) {
      window.location.href = '/';
    } else {
      console.log("Page route", data);
      name.value = data.name;
      profile.value = data.profileImage;
      short_name.value = data.given_name;
      id.value = data.sub;
    }
  })();
</script>
