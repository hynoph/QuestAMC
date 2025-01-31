import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import Navbar from './navbar';

const Dashboard: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user as User | undefined;

    const handleNavigateToModules = () => {
        navigate("/modules");
    };

    return (
        <>
            <div className="mb-20">
                <Navbar />
                <div className="container mx-auto mt-36 text-center"> {/* Increased the margin-top */}
                    <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
                    <p className="text-xl">Welcome to the Dashboard!</p>
                    {user && (
                        <div className="my-6">
                            <p className="text-lg">Name: {user.displayName}</p>
                            <p className="text-lg">Email: {user.email}</p>
                        </div>
                    )}
                    <button 
                        className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                        onClick={handleNavigateToModules}
                    >
                        Modules
                    </button>
                </div>
            </div>
        </>
    );
}

export default Dashboard;