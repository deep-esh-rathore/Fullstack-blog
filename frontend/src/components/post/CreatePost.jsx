import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/PostServices';
import { setLoading } from '../../store/authSlice';
import PostForm from './PostForm';

function CreatePost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const submitPost = async (data) => {
        dispatch(setLoading(true));
        // setMessage('');

        console.log("Form Data Before Sending:", data);

        try {
            const result = await createPost(data); // this should accept FormData
            console.log(result);
            if (result) {
                if(result) navigate('/'); // redirect to posts page or wherever needed
            }
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <PostForm onFormSubmit={submitPost} btn='Create Post' />
    )
}

export default CreatePost