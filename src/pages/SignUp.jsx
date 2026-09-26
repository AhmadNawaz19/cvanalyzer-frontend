import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styles/signup.css'
import SocialLogin from '../components/SocialLogin'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const schema = z.object({
    name: z.string().regex(/^[a-zA-Z0-9_' ']+$/, 'username contain letter,number and underscore'),
    email: z.string().email().endsWith('@gmail.com'),
    password: z.string().min(8, 'Minimum password must 8 Digit').regex(/^[a-zA-Z0-9_.]+$/, 'password contain letter,number, dot and underscore')
})

const SignUp = React.memo(() => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const { getValues, setError, clearErrors, register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    const CreateUser = useMutation({
        mutationFn: (data) => axios.post('http://localhost:8000/user/createUser', data, {
            withCredentials : true
        }),
        onSuccess: (response) => {
            console.log(response.data)
            navigate('/profile')
        },
        onError: (error) => {
            setError("root.serverError", {
                type: "manual",
                message: error.response?.data?.message,
            });
        },
    })

    const submitData = (data) => {
        console.log(data)
        CreateUser.mutate(data)
    }

    const showPassword = () => {
        show ? setShow(false) : setShow(true);
    }

    return (
        <div id='signup'>
            <form onSubmit={handleSubmit(submitData)}>

                <div class="userinput">
                    <i class="fa-solid fa-user"></i>
                    <input
                        {...register('name', {
                            required: 'UserName is required'
                        })}
                        onClick={() => clearErrors('name')}
                        onChange={() => clearErrors('name')}
                        type="text" placeholder='Enter UserName' />
                </div>
                {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                )}

                <div class="userinput">
                    <i class="fa-solid fa-envelope"></i>
                    <input
                        {...register('email', {
                            required: 'Email is required'
                        })}
                        onClick={() => clearErrors('email')}
                        onClick={() => clearErrors('root.serverError')}
                        onChange={() => clearErrors('email')}
                        type="email" placeholder='Enter Email' />
                </div>
                {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                )}

                <div class="userinput">
                    <i class="fa-solid fa-key"></i>
                    <input
                        {...register('password', {
                            required: 'Password is required'
                        })}
                        onClick={() => clearErrors('password')}
                        onChange={() => clearErrors('email')}
                        type={show ? 'password' : 'text'} placeholder='Enter Password' />
                    {
                        show ? <i style={{ marginRight: '10px' }} class="fa-regular fa-eye-slash" onClick={() => showPassword()}></i> : <img src="https://www.svgrepo.com/show/365364/eye-thin.svg" style={{ height: "25px", marginRight: '10px' }} onClick={() => showPassword()}></img>
                    }
                </div>
                {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                )}

                {errors.root?.serverError && (
                    <p style={{ color: "red" }}>{errors.root.serverError.message}</p>
                )}

                <button id='loginBtn'>Register</button>
                <p id='para1'>If already have Account <Link to='/login'>Login</Link> </p>
                <p>or</p>
                <SocialLogin />
                <Link to="/" className="back-profile-btn">
                    <i className="fa-solid fa-arrow-left"></i> Back to Home
                </Link>
            </form>
        </div>
    )
})

SignUp.displayName = 'signup'
export default SignUp