import axios from 'axios';
import React, {createContext} from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ProductsApi from '../api/productsApi';
import UserApi from '../api/UserApi';


export const GlobalState = createContext();



export const DataProvider = (props) => {

    const [token, setToken] = useState(false)


    const refreshToken = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/refresh_token', {withCredentials:true});

            setToken(res.data.accessToken)
        }
        catch(err) {
            console.log(err.message)
        }
    }

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin)  refreshToken();
    }, [])

    const state = {
        token: [token, setToken],
        productsApi: ProductsApi(),
        userApi: UserApi(token),
    }

    return(
        <GlobalState.Provider value={state}> 
            {props.children};
        </GlobalState.Provider>
    )
}