export default defineNuxtRouteMiddleware(async(to, from) => {
  const token = useCookie('token');
  const { success } = await useGoogleAuth(token.value)
  if(to.path == '/chat' && !success) {
    return navigateTo('/');
  }
  if(to.path == '/' && success) {
    return navigateTo('/chat');
  }
})