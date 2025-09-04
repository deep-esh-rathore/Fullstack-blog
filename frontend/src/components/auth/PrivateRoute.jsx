import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loading } from '../index'

function PrivateRoute({ children, authenticated }) {
    const authstatus = useSelector((state) => state.auth.status);
    const loading = useSelector((state) => state.auth.loading);

    if (loading) {
        return <Loading />;
    }

    // If the route requires authentication but user is not logged in
    if (authenticated && !authstatus) {
        return <Navigate to="/login" replace />
    }

    // If the route must be public but user IS logged in
    if (!authenticated && authstatus) {
        return <Navigate to="/" replace />
    }
    return (
        <>{children}</>
    )
}

export default PrivateRoute