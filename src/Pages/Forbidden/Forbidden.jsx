import React from 'react';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Forbidden 🚫</h1>
                <p className="text-gray-600 mb-6">
                    You do not have permission to access this page.<br />
                    This section is restricted to authorized users only.
                </p>
                <Link to="/" className="btn btn-primary">🔙 Go Back Home</Link>
            </div>
        </div>
    );
};

export default Forbidden;
