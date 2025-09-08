import React, { useEffect,useState } from 'react'
import { PostCard } from '../components/index'
import { getAllPosts } from '../services/PostServices'
import { setLoading } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 18;

  useEffect(() => {
    setLoading(true);
    getAllPosts()
      .then((posts) => {
        console.log("Fetched Posts:", posts);
        setPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="container mx-auto p-4">
      {posts.length === 0 && (
        <div className="flex items-center justify-center h-96">
    <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-8 text-center">
      <p className="text-xl font-semibold text-gray-700">
        No posts available
      </p>
      <p className="text-gray-500 mt-2">
        Why not create the first one? 🚀
      </p>
      <button
        onClick={() => navigate('/posts/create')}
        className="mt-4 bg-violet-700 hover:bg-violet-800 text-white px-6 py-2 rounded-lg shadow-md transition"
      >
        + Create Post
      </button>
    </div>
  </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            title={post.title}
            featuredImage={post.featuredImage}
            content={post.content}
            slug={post.slug}
          />
        ))}
      </div>
       {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-violet-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

    </div>
  )
}

export default Home