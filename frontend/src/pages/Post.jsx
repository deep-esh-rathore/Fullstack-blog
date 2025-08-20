import React, { useEffect, useState } from 'react'
import { getPostById } from '../services/PostServices'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
import { deletePost } from '../services/PostServices';


function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    try {
      getPostById(id)
      .then((data) => {
        setPost(data);
      }).catch((error) => {
        console.error("Error fetching post:", error);
      });
    } catch (error) {
      console.error("Error in Post component:", error);
    }
  }, [id, user]);

  const isAuthor = post && user && post.userId === user._id;

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/');
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }
  return (
    <div>
      {post && (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-2">{new Date(post.createdAt).toLocaleDateString()}</p>
          <img src={post.featuredImage} alt={post.featuredImage} />
          <p className="text-gray-600 mb-2">By <span className="font-semibold">{post.author}</span></p>
          <div className="prose prose-lg text-gray-700">
            {post.content}
          </div>
          {isAuthor && (
            <div className="flex justify-end mt-4 space-x-2">
            <button
              className="bg-violet-900 hover:bg-purple-950 text-white font-semibold 
              py-2 px-4 rounded cursor-pointer"
              onClick={() => navigate(`/edit/${post._id}`)}
            >
              Edit
            </button>
            <button
              className="bg-pink-900 hover:bg-pink-700 text-white font-semibold 
              py-2 px-4 rounded cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Post