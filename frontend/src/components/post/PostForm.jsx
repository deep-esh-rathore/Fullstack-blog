import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../index'; // assuming you have a Button component

const PostForm = ({ postdata, onFormSubmit, btn = "" }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (postdata) {
      setValue('title', postdata.title || '');
      setValue('slug', postdata.slug || '');
      setValue('content', postdata.content || '');
      setValue('status', postdata.status || 'active');
      setValue('image', postdata.featuredImage); // assuming post has featuredImage
    }
  }, [postdata]);


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

    const currentSlug = watch('slug');
    if (generatedSlug !== currentSlug) {
      setValue('slug', generatedSlug);
    };
  }, [titleValue, setValue]);

  const onSubmit = async (data) => {
    setMessage('');
    try {
      // Convert data to FormData
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    formData.append("status", data.status);

    if (data.featuredImage && data.featuredImage[0]) {
      formData.append("featuredImage", data.featuredImage[0]); // 👈 match multer field
    }
    await onFormSubmit(formData);
    setMessage('Post submitted successfully!');
    }
    catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Failed to submit post.');
    }
  }



  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
      {message && <p className="text-blue-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {...register('status', { required: 'Status is required' })}
          id='status' name='status'
          className="border w-full border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-800"
        >
          <option value="active" className=' text-m font-mediumitalic text-purple-900'>Active</option>
          <option value="inactive" className='text-m font-mediumitalic text-purple-900'>Inactive</option>
        </select>

        <input
          type="file"
          id="featuredImage" name="featuredImage"
          accept="image/*"
          {...register("featuredImage")}
          className="border w-full border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-800"
        />

        <Button type="submit">
          {btn || "Submit Post"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
