import React from 'react'
import { logout } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authServices';

function LogoutBtn() {
    const dispatch = useDispatch();
    const authstatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                console.log("Logout successful");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
        dispatch(logout());
        navigate('/login'); // Redirect to login page after logout
    }
    if (!authstatus) return null; // Don't render if not logged in

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default LogoutBtn