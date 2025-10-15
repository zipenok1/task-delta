import axios from "axios";

const api = axios.create({
    baseURL: 'http://test-backend.itdelta.agency/api/'
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 429) {
      return new Promise(resolve => {
        setTimeout(() => resolve(api(err.config)), 1000) // повтор через 1 сек
      })
    }
    return Promise.reject(err)
  }
)

export const getPhoto = async () => {
    return (await api.get('images')).data
}

export const getDetals = async (id) => {
    return (await api.get(`image/${id}`)).data
}

export const postPhoto = async (values, id) => {
    return (await api.post(`image/${id}/comments`, values)).data
}