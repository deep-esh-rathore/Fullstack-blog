import React, { useState } from 'react'
import { loginUser } from '../services/authServices'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login, setLoading } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Input, Button } from './index'
import { useSelector } from 'react-redux'

function Login() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const loading = useSelector((state) => state.auth.loading);

    const handleLogin = async (userData) => {
        dispatch(setLoading(true));
        setError("");
        try {
            const response = await loginUser(userData);
            if (response && response.user) {
                console.log('User logged in successfully:', response);
                dispatch(login(response));
                navigate('/');
            }
            else {
                setError('try after some time, server is not responding');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.message === 'Failed to fetch') {
                setError("Cannot connect to server. Please try again later.");
            } else if (error.response && error.response.status === 401) {
                setError('Invalid email or password. Please try again.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (

        <div className='flex justify-center items-center min-h-[80vh] bg-gray-100'>
            <div className='border p-8 rounded-lg shadow-md bg-white min-w-[350px]'>
                <h2 className='mb-6 text-center text-2xl font-semibold text-purple-900'>Sign-in</h2>
                {error && (
                    <p className="text-red-500 text-center text-sm font-medium mb-2">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
                    {/* {loading && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
                            <span className="text-purple-700 font-semibold">Loading...</span>
                        </div>
                    )} */}
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
                    <Button type="submit" className="mt-4" disabled={loading}>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login