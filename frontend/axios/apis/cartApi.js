import api from "../apiclient"

export const addToCart = (item) => {
    const token = localStorage.getItem('token')
    return api.patch('/api/my/addcart', item, {
        headers: {
            Authorization: token
        }
    })
}

export const removeFromCart = (item) => {
    const token = localStorage.getItem('token')
    return api.patch('/api/my/addcart', item, {
        headers: {
            Authorization: token
        }
    })
}