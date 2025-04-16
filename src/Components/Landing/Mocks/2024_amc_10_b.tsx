import React from "react";
import Navbar from "../navbar";
import test_img from "../../../assets/amc_test.png";
import { useNavigate } from "react-router-dom";

const Example: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <Navbar />
            </div>
            
            <div className="container mx-auto px-4 py-8">
                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Section (2/3 width) */}
                    <div className="lg:w-2/3">
                        {/* Image */}
                        <div className="mb-6">
                            <img 
                                src={test_img} 
                                alt="AMC Test" 
                                className="w-full h-auto rounded-lg shadow-md"
                            />
                        </div>
                        
                        {/* Contest Info */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-1">2024 AMC 10A</h1>
                            <p className="text-gray-600 mb-4">Hosted by Gautham Korrapati • 11/6/2024</p>
                            
                            {/* Rating */}
                            <div className="flex items-center mb-6">
                                <div className="rating rating-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <input 
                                            key={i}
                                            type="radio" 
                                            name="rating-2" 
                                            className={`mask mask-star-2 ${i < 2 ? 'bg-yellow-400' : (i === 2 ? 'bg-yellow-200' : 'bg-gray-300')}`} 
                                            checked={i === 2}
                                            readOnly
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 font-medium">2.5/5</span>
                                <span className="ml-2 text-gray-500">(20 reviews)</span>
                            </div>
                            
                            {/* Stats */}
                            <div className="flex items-center mb-8">
                                <div className="border-2 border-gray-800 rounded-lg px-6 py-2 text-center">
                                    <div className="font-bold">25</div>
                                    <div className="text-sm text-gray-600">questions</div>
                                </div>
                                <div className="px-4 text-gray-400">|</div>
                                <div className="border-2 border-gray-800 rounded-lg px-6 py-2 text-center">
                                    <div className="font-bold">75</div>
                                    <div className="text-sm text-gray-600">minutes</div>
                                </div>
                                <div className="ml-6 badge badge-primary badge-lg bg-purple-100 text-purple-800 border-purple-200">
                                    Difficulty: 1500
                                </div>
                            </div>
                            
                            {/* Start Button */}
                            <button onClick={() => navigate("/modules/mocks/2024amc10b")} className="btn btn-primary btn-lg w-full mb-8">
                                Start Contest Mock
                            </button>
                            
                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-bold mb-3">Details:</h2>
                                <p className="text-gray-700">
                                    This is the 2024 AMC 10A! Scoring is 6 points per correct answer, 
                                    1.5 points per blank answer, and 0 points per incorrect answer.
                                    <br /><br />
                                    If you took the 2024 AMC 10A live, please click "Start Mock Contest" 
                                    to input your actual answers and we can see the score + answer distributions.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Section (1/3 width) - Chat Bar */}
                    <div className="lg:w-1/3">
                        <div className="bg-gray-50 rounded-lg p-4 h-full shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Contest Chat</h3>
                            <div className="h-64 border rounded-md p-3 bg-white">
                                {/* Placeholder for chat messages */}
                                <div className="text-center text-gray-400 mt-20">
                                    Chat will appear here
                                </div>
                            </div>
                            <div className="mt-3 flex">
                                <input 
                                    type="text" 
                                    placeholder="Type a message..." 
                                    className="input input-bordered w-full" 
                                />
                                <button className="btn btn-primary ml-2">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Example;