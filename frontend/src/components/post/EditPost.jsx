import React, { useState,useEffect } from 'react'
import PostForm from './PostForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { updatePost,getPostById } from '../../services/PostServices';
import { setLoading,setMessage } from '../../store/authSlice';


function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postdata, setPostdata] = useState(null);

  useEffect(() => {
      getPostById(id)
      .then((data) => {
        setPostdata(data);
      }).catch((error) => {
        console.error("Error fetching post for edit:", error);
        dispatch(setMessage("Failed to fetch post ❌"));
      });
  },[id]);

  const update = async (data) => {
    dispatch(setLoading(true));
    try {
      const result = await updatePost(id, data);
      if (result) {
        dispatch(setMessage("Post updated successfully ✨"));
        // console.log('Post updated successfully:', result);
        navigate(`/posts/${result.slug}/${result._id}`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      dispatch(setMessage(error.message || "Failed to update post ❌"));
    } finally {
      dispatch(setLoading(false));
    }
  }


  return (
    <PostForm postdata={postdata} onFormSubmit={update} btn='Update Post'/>
  )
}

export default EditPost