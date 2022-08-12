import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../GlobalState'
import NotFound from './NotFound'

const Login = () => {

    const state = useContext(GlobalState)
    const isLogged = state.userApi.isLogged[0];

    
    if(isLogged)
        return <NotFound/>


        
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const validateEmail = (email) => {

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return email.match(regex);
    }

    const loginSubmit = async (e) => {
        e.preventDefault();

        try {

            if(!validateEmail(user.email))  return alert("Please enter a valid email.");  

            const res = await axios.post('http://localhost:5000/api/auth/login', {...user}, {withCredentials: true})

            localStorage.setItem('firstLogin', true);


            window.location.href = '/'
        }
        catch(err) {
            alert(err.response)
        }
    }


    return (
        <div className='flex justify-center'>
            <div className='border-solid border-teal-900 mx-8 sm:w-96 p-10 border-2 my-24  '>
                <div className='text-4xl ml-2 font-light'>Log In</div>
                <form className='flex mt-4 w-full flex-col justify-center'>
                    <input onChange={onChangeInput} required className='border-2 border-teal-700 mt-4 p-2'
                    name='email' type="email" placeholder='Email' value={user.email} />
                    
                    <input onChange={onChangeInput} required className='border-2 border-teal-700 mt-4 p-2'
                    type="password" name="password" placeholder='Password' value={user.password}/>
                    
                    <button onClick={loginSubmit} type="submit" className='mt-8 rounded-sm border-none cursor-pointer
                    hover:bg-teal-800 bg-teal-600 text-white px-6 py-2'>Sign In</button>
                    
                    <div className='mt-6 w-fit cursor-pointer underline hover:text-teal-700'>FORGOT PASSWORD?</div>
                    
                    <Link to='/register'>
                        <div className='mt-1 w-fit cursor-pointer  underline  hover:text-teal-700'> CREATE ACCOUNT</div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login