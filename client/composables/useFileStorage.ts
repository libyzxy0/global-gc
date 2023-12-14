import axios from 'axios';
export default async function useFileStorage(file) {
  try {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.post('https://file-api.libyzxy0.repl.co/upload', formData, { headers: headers});
      return { success: true, data: response.data };
    } else {
      return { success: false, data: {} };
    }
  } catch (error) {
    console.error(error.message);
    return { success: false, data: {} };
  }
}