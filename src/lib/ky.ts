import axios from 'axios';
export const ky = axios.create({
  baseURL: 'https://localhost:5000/api',
  // Другие параметры...
});
export const http = {
  post: (api: string, body: object): Promise<any> => {
    return fetch('https://localhost:5000/api' + api, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error; // Пробрасываем ошибку дальше
      });
  },
  get(api: string) {
    return fetch('https://localhost:5000/api/' + api).then((response) => response.json()).catch(console.log)
  }
};
