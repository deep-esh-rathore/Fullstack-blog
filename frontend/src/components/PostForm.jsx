import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setLoading } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/PostServices'; // adjust if needed
import { Button, Input } from './index'; // assuming you have a Button component

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch,setValue, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const submitPost = async (data) => {
    dispatch(setLoading(true));
    setMessage('');

    console.log("Form Data Before Sending:", data);

    try {
      const formData = {...data,
        featuredImage: data.image[0].name // handle file input
      }
      const result = await createPost(formData); // this should accept FormData
      console.log(result);
      if (result) {
      setMessage('Post created successfully!');
      navigate('/'); // redirect to posts page or wherever needed
      }
    } catch (error) {
      setMessage('Failed to create post.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const titleValue = watch('title'); // watch for title changes
  useEffect(() => {
  const trimmedTitle = titleValue?.trim();
  if (!trimmedTitle) {
    setValue('slug', '');
    return;
  }

  const generatedSlug = trimmedTitle
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with dashes
    .replace(/-+/g, '-');     // Collapse multiple dashes

  setValue('slug', generatedSlug);
}, [titleValue, setValue]);



  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
      {message && <p className="text-blue-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit(submitPost)} className="space-y-4">
        <Input
          {...register('title', { required: 'Title is required' })}
          id="title" name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}

        <Input
          {...register('slug', { required: 'Slug is required' })}
          id="slug" name="slug"
          placeholder="Slug"
          className="w-full border p-2 rounded"
          readOnly
        />
        {errors.slug && <p className="text-red-600">{errors.slug.message}</p>}

        <textarea
          {...register('content', { required: 'Content is required' })}
          placeholder="Content" name='content'
          className="border w-full border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-800"
        />
        {errors.content && <p className="text-red-600">{errors.content.message}</p>}

        <select
          {...register('status',{ required: 'Status is required' })}
          id='status' name='status'
          className="border w-full border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-800"
        >
          <option value="active" className=' text-m font-mediumitalic text-purple-900'>Active</option>
          <option value="inactive" className='text-m font-mediumitalic text-purple-900'>Inactive</option>
        </select>

        <input
          type="file"
          id="image" name="image"
          accept="image/*"
          {...register('image')}
          className="border w-full border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-800"
        />

        <Button type="submit">
          Create Post
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
