import api from "../apiclient"

export const login = (data) => {
    return api.post('/api/auth/login', data)
}

export const register = (data) => {
    return api.post('/api/auth/register', data)
}

export const logout = (data) => {
    // return await api.
}