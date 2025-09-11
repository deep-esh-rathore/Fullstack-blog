import React, { useEffect, useState } from "react";
import { getPostById, deletePost } from "../services/PostServices";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setMessage } from "../store/authSlice";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    try {
      getPostById(id)
        .then((data) => {
          setPost(data);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    } catch (error) {
      console.error("Error in Post component:", error);
    }
  }, [id, user]);

  const isAuthor = post && user && post.userId === user._id;

  const handleDelete = async () => {
    dispatch(setLoading(true));
    try {
      await deletePost(id);
      dispatch(setMessage("Post deleted successfully ✅"));
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {post && (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-8 mt-6 sm:mt-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800 break-words">
            {post.title}
          </h1>

          {/* Date */}
          <p className="text-gray-500 text-xs sm:text-sm mb-2">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          {/* Image */}
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto rounded-md mb-4 object-cover"
            />
          )}

          {/* Author */}
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            By <span className="font-semibold">{post.author}</span>
          </p>

          {/* Content */}
          <div className="prose prose-sm sm:prose lg:prose-lg text-gray-700 max-w-none">
            {post.content}
          </div>

          {/* Buttons (only for author) */}
          {isAuthor && (
            <div className="flex flex-col sm:flex-row justify-end mt-6 gap-3">
              <button
                className="bg-violet-900 hover:bg-purple-950 text-white font-semibold 
                py-2 px-4 rounded cursor-pointer w-full sm:w-auto text-center"
                onClick={() => navigate(`/edit/${post._id}`)}
              >
                Edit
              </button>
              <button
                className="bg-pink-900 hover:bg-pink-700 text-white font-semibold 
                py-2 px-4 rounded cursor-pointer w-full sm:w-auto text-center"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
