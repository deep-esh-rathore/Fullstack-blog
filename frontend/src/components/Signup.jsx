import React from 'react'
import { createUser } from '../services/authServices'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import {Input,Button} from './index'

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const createAccount = async (userData) => {
    try {
      const response = await createUser(userData);
      if(response){
      console.log('User created successfully:', response);
      dispatch(login(response))
      navigate('/login')};
    } catch (error) {
      console.error('Signup error:', error);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="border p-8 rounded-lg shadow-md bg-white min-w-[350px]">
        <h2 className="mb-6 text-center text-2xl font-semibold text-purple-900">Enter details to create account</h2>
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