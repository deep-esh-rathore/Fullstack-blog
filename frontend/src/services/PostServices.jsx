const BASE_URL = import.meta.env.VITE_BASE_URL;
const postsURL = `${BASE_URL}/posts`;

export const createPost = async (postData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(postsURL, {
            method: 'POST',
            credentials: 'include', // important to send cookies
            body: postData, // send FormData directly
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in createPost:', error);
    }
}



export const getAllPosts = async () => {
    try {
        const response = await fetch(postsURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getAllPosts:', error);
    }
}

export const getPostById = async (postId) => {
    try {
        const response = await fetch(`${postsURL}/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getPostById:', error);
    }
}

export const updatePost = async (postId, postData) => {
    // const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${postsURL}/${postId}`, {
            method: 'PUT',
            credentials: 'include', // important to send cookies
            body: postData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in updatePost:', error);
    }
}

export const deletePost = async (postId) => {
    // const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${postsURL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
            },
            credentials: 'include', // important to send cookies
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in deletePost:', error);
    }
}