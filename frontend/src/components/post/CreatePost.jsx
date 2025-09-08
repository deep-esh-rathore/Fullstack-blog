import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/PostServices';
import { setLoading,setMessage } from '../../store/authSlice';
import PostForm from './PostForm';

function CreatePost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const submitPost = async (data) => {
        dispatch(setLoading(true));

        console.log("Form Data Before Sending:", data);

        try {
            const result = await createPost(data); // this should accept FormData
            console.log(result);
            if (result) {
                if(result) {
                    dispatch(setMessage('Post created successfully 📝'));
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Error creating post:', error);
            dispatch(setMessage(error.message || "Failed to create post ❌"))
        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <PostForm onFormSubmit={submitPost} btn='Create Post' />
    )
}

export default CreatePost