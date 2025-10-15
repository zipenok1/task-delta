import axios from "axios";

const api = axios.create({
    baseURL: 'http://test-backend.itdelta.agency/api/'
})

export const getPhoto = async () => {
    return (await api.get('images')).data
}

export const getDetals = async (id) => {
    return (await api.get(`image/${id}`)).data
}

export const postPhoto = async (values, id) => {
    return (await api.post(`image/${id}/comments`, values)).data
}