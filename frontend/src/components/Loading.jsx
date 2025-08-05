import React from 'react';

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-20 h-20 border-8 border-gray-200 border-t-purple-900 rounded-full animate-spin"></div>
        </div>
    );
}

export default Loading;