const BASE_URL = import.meta.env.VITE_BASE_URL;
const authURL = `${BASE_URL}/auth`;


export const createUser = async (userData) => {
    try {
        const response = await fetch(`${authURL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${authURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include', // important to send cookies
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        console.error('Error in loginUser:', error);
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await fetch(`${authURL}/me`, {
            method: "GET",
            credentials: "include", // important to send cookies
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch current user");
        }

        return await response.json();
    } catch (error) {
        console.error('Error in getCurrentUser:', error);
        throw error;
    }
}

export const logoutUser = async () => {

    try {
        const response = await fetch(`${authURL}/logout`, {
            method: "POST",
            credentials: "include", // important to send cookies
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to logout");
        }
        return response.json();
    } catch (error) {
        console.error("Logout failed:", error);
    }
}