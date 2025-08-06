import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute({ children, authenticated }) {
    const navigate = useNavigate();
    const authstatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authenticated && authstatus !== authenticated) {
            navigate("/login");
        } else if (!authenticated && authstatus !== authenticated) {
            navigate("/");
        }
    }, [authstatus, navigate, authenticated]);
    return (
        <>{children}</>
    )
}

export default PrivateRoute