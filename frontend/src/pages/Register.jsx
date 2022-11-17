import { Checkbox } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NotFound from './NotFound'
import api from '../../axios/apiclient'

const Register = () => {

    // const state = useContext(GlobalState)
    // const isLogged = state.userApi.isLogged[0];

    // const state = {    }
    // const isLogged = true;

    // if(isLogged)    return <NotFound/>

    if(token)    navigate(-1);

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [checked, setChecked] = useState(false)

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const validateEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.match(regex);
    }

    const registerSubmit = async (e) => {
        e.preventDefault();

        try {
            
            // check is email Valid 
            if(!validateEmail(user.email)) return alert("Please enter a valid email")
            
            if(user.password !== user.confirmPassword)   return alert("Password and confirm password did not match")
            
            if(!checked) return alert("Please accept the terms and conditions to proceed")
            
            const res = await api.post('/api/auth/register', {...user})
            
            localStorage.setItem('firstLogin', true);

            window.location.href = '/'
        }
        catch(err) {
            alert(err.response.data.msg)
        }
    }



    return (
        <div className='flex items-center justify-center '>
            <div className='border-2 border-teal-900 mx-6 xsm:max-w-sm md:max-w-md p-8  flex flex-col my-20 items-center justify-center '>
                <div className='text-4xl font-light'>Create an Account</div>
                <form >
                    <div className='mt-6 flex flex-col justify-center'>
                        <input onChange={onChangeInput} required className='border-2 w-5/6 p-2' type="text"
                        placeholder='Full Name' name='username' value={user.username}/>
                        <input onChange={onChangeInput} name='email' required className='border-2 w-5/6 mt-3 p-2' 
                        type="email" placeholder='Email' value={user.email} />
                        <input onChange={onChangeInput} name='password' required value={user.password} 
                        className='border-2 w-5/6  mt-3 p-2' type="password" placeholder='Password' />
                        <input onChange={onChangeInput} name='confirmPassword' required value={user.confirmPassword} 
                        className='border-2 w-5/6  mt-3 p-2' type="password" placeholder='Confirm Password' />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <Checkbox onClick={() => setChecked(!checked)}></Checkbox>
                        <span > By creating an account, I consent to the processing of my personal data in accordance with the <span className='font-semibold'>PRIVACY POLICY</span>
                        </span>
                    </div>
                    <div className='flex justify-between items-center mt-6 '>
                        <button onClick={registerSubmit} type="submit" className='rounded-md border-none cursor-pointer hover:bg-teal-800 bg-teal-600 text-white px-6 py-2'> Create </button>
                        <Link to='/login'>
                            <span className='cursor-pointer font-semibold hover:text-teal-700'>LOG IN</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Register