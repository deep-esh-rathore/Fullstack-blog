import React, { useEffect,useState } from 'react'
import { PostCard } from '../components/index'
import { getAllPosts } from '../services/PostServices'

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((posts) => {
        console.log("Fetched Posts:", posts);
        setPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [])
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts && posts.map((post) => (
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
    </div>
  )
}

export default Home