import React from 'react'
import { createUser } from '../../services/authServices'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login,setLoading } from '../../store/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { Input, Button } from '../index'

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState('');
  const { register, handleSubmit } = useForm();
  const loading = useSelector((state) => state.auth.loading);

  const createAccount = async (userData) => {
    dispatch(setLoading(true));
    setError('');
    try {
      const response = await createUser(userData);
      if (response) {
        console.log('User created successfully:', response);
        dispatch(login(response))
        navigate('/login')
      }
      else {
        setError('try after some time, server is not responding');
      }
    } catch (error) {
      console.error('Signup error:', error);
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
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="border p-8 rounded-lg shadow-md bg-white min-w-[350px]">
        <h2 className="mb-6 text-center text-2xl font-semibold text-purple-900">Enter details to create account</h2>
        {error && (
          <p className="text-red-500 text-center text-sm font-medium mb-2">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(createAccount)} className="flex flex-col gap-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
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
          <Button type="submit" className="mt-4">Create Account</Button>
        </form>
      </div>
    </div>
  )
}

export default Signup