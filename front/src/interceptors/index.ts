import axios from "axios"

export const AxiosInterceptor = () => {

  const header = (request : any) => {
    request.headers = {
        'Content-Type': "application/json",
        Authorization : `Basic aXNhYy1oYWNrYXRvbi0yMDIzOmNzaGFja2F0aG9ueGR4ZDQ1NjMx`,
    }
    return request
  }

  axios.interceptors.request.use((request) => {
    if (request.url?.includes('assets') || request.headers?.Authorization) {
      return request;
    }
    return header(request)
  })

  axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log('response',error.response.data);
      return Promise.reject(error.response.data);
    },
  );
}