import React from 'react'
import { Link } from 'react-router-dom';

function PostCard({ ...props }) {
    const { title, slug, featuredImage, content,id } = props;
    return (
        <Link to={`/posts/${slug}/${id}`} className="post-card-link">
        <div className="post-card border border-gray-200 rounded-lg p-4 max-w-md mx-auto my-4 shadow-sm bg-white transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
            <img src={featuredImage} alt={featuredImage} className="w-full rounded-lg mb-3" />
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700">{content}</p>
        </div>
        </Link>
    )
}

export default PostCard