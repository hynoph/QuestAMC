import React from "react";

const reviewsData = [
    { id: 1, text: "Amazing service!", author: "John Doe" },
    { id: 2, text: "Best platform ever!", author: "Jane Smith" },
    { id: 3, text: "Highly recommended!", author: "Mike Johnson" },
    { id: 4, text: "Great experience!", author: "Sarah Williams" },
    { id: 5, text: "Outstanding support!", author: "Alex Brown" },
];

const Reviews: React.FC = () => {
    return (
        <div className="w-full px-4">
            <h1 className="text-5xl text-white font-poppins font-bold text-center mt-40 mb-20">
                What Our Clients Say
            </h1>
            <div className="flex justify-center gap-8">
                {/* First Column - Slower */}
                <div className="h-[400px] w-80 overflow-hidden">
                    <div className="animate-[slideUp_25s_linear_infinite] hover:pause">
                        {[...reviewsData, ...reviewsData].map((review, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg mb-6 
                                         transform transition-all duration-300 hover:scale-105 
                                         border border-gray-700/50"
                            >
                                <p className="text-white mb-4">{review.text}</p>
                                <p className="text-gray-400">- {review.author}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second Column - Medium Speed */}
                <div className="h-[400px] w-80 overflow-hidden">
                    <div className="animate-[slideUp_20s_linear_infinite] hover:pause">
                        {[...reviewsData, ...reviewsData].map((review, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg mb-6 
                                         transform transition-all duration-300 hover:scale-105 
                                         border border-gray-700/50"
                            >
                                <p className="text-white mb-4">{review.text}</p>
                                <p className="text-gray-400">- {review.author}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Third Column - Faster */}
                <div className="h-[400px] w-80 overflow-hidden">
                    <div className="animate-[slideUp_15s_linear_infinite] hover:pause">
                        {[...reviewsData, ...reviewsData].map((review, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg mb-6 
                                         transform transition-all duration-300 hover:scale-105 
                                         border border-gray-700/50"
                            >
                                <p className="text-white mb-4">{review.text}</p>
                                <p className="text-gray-400">- {review.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
