import React from 'react'
import { loginUser } from '../services/authServices'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Input, Button } from './index'
import { useSelector } from 'react-redux'

function Login() {
    const status = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const handleLogin = async (userData) => {
        try {
            const response = await loginUser(userData);
            if (response) {
                console.log('User logged in successfully:', response);
                dispatch(login(response));
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-[80vh] bg-gray-100'>
            <div className='border p-8 rounded-lg shadow-md bg-white min-w-[350px]'>
                <h2 className='mb-6 text-center text-2xl font-semibold text-purple-900'>Sign-in</h2>
                <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", { required: true })}
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" className="mt-4">Login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login