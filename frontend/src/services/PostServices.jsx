const BASE_URL = import.meta.env.VITE_BASE_URL;
const postsURL = `${BASE_URL}/posts`;

export const createPost = async (postData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(postsURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // important to send cookies
            body: JSON.stringify(postData),
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

// export const createPost = async (postData) => {
//     try {
//         const formData = new FormData();

//         // Append all post data to formData
//         formData.append('title', postData.title);
//         formData.append('slug', postData.slug);
//         formData.append('content', postData.content);
//         formData.append('status', postData.status);
//         if (postData.image) {
//             formData.append('image', postData.image[0]); // image = File from input
//         }

//         const response = await fetch(postsURL, {
//             method: 'POST',
//             credentials: 'include', // important to send cookies
//             body: formData,
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'Failed to create post');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error in createPost:', error);
//         throw error; // Re-throw the error to handle it in the calling function
//     }
// };


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
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${postsURL}/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
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
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${postsURL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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