import React,{useEffect, useState} from 'react'
import { getPostById } from '../services/PostServices'
import { useParams } from 'react-router-dom';


function Post() {
  const { id } = useParams();
  const [post, setPost] = useState('');
  
    useEffect(() => {
      try {
        const response = getPostById(id);
    response.then((data) => {
      setPost(data);
      console.log("Fetched Post:", data);
    }).catch((error) => {
      console.error("Error fetching post:", error);
    });
  } catch (error) {
    console.error("Error in Post component:", error);
  }
    }, [id]);
    

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
        </div>
      ) }
    </div>
  )
}

export default Post