export async function useRetrieveMessage() {
  const config = useRuntimeConfig();
  let response = await fetch(`${config.public.baseURL}/retrieve-messages`, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({})
  })
  let data = await response.json();
  return data
}