import React, { useState,useEffect } from 'react'
import PostForm from './PostForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { updatePost,getPostById } from '../../services/PostServices';
import { setLoading } from '../../store/authSlice';


function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postdata, setPostdata] = useState(null);

  useEffect(() => {
    try {
      getPostById(id)
      .then((data) => {
        setPostdata(data);
      }).catch((error) => {
        console.error("Error fetching post for edit:", error);
      });
    } catch (error) {
      console.error("Error fetching post for edit:", error);
    }
  },[id]);

  const update = async (data) => {
    dispatch(setLoading(true));
    try {
      const formData = {
        ...data,
        featuredImage: data.image[0].name // handle file input
      }
      const result = await updatePost(id, formData);
      if (result) {
        console.log('Post updated successfully:', result);
        navigate(`/posts/${result.slug}/${result._id}`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }


  return (
    <PostForm postdata={postdata} onFormSubmit={update} btn='Update Post'/>
  )
}

export default EditPost