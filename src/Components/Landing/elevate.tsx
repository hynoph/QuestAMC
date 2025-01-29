import React from "react";
import { FaArrowRight } from 'react-icons/fa';
import amc from '../../assets/amc.avif';
import ap from '../../assets/ap.jpg';
import fma from '../../assets/fma.webp';

const Elevate: React.FC = () => {
    return (
        <div className="px-4 text-center">
            <h3 className="text-sm text-custom-purple font-semibold mb-2">HOW IT WORKS?</h3>
            <h1 className="text-5xl font-inter font-bold mb-8">Learn from Discord in 3 different products</h1>
            
            {/* Boxes with Arrows */}
            <div className="flex items-center justify-center space-x-4">
                {/* First Box */}
                <div className="flex-shrink-0 w-80 h-80 bg-custom-black border-4 border-gray-500 rounded-xl relative overflow-hidden">
                    <div className="absolute top-4 left-4">
                        <div className="rounded-full bg-base-100 p-1">
                            <div className="relative flex size-12 items-center justify-center rounded-full border border-base-100/20 bg-primary shadow-lg">
                                <span className="text-xl font-extrabold text-primary-content">1</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-full">
                        <div className="h-1/2">
                            <img src={amc} alt="AMC POTD" className="object-cover h-full w-full" />
                        </div>
                        <div className="h-1/2 p-4 text-white">
                            <h1 className="text-2xl font-semibold">AMC POTD</h1>
                            <p className="text-gray-400">Posts a math problem every day, collaborate with others, and view answers later (6.5k+ users)</p>
                        </div>
                    </div>
                </div>
                
                {/* First Arrow */}
                <FaArrowRight className="text-gray-400 text-xl" />
                
                {/* Second Box */}
                <div className="flex-shrink-0 w-80 h-80 bg-custom-black border-4 border-gray-500 rounded-xl relative overflow-hidden">
                    <div className="absolute top-4 left-4">
                        <div className="rounded-full bg-base-100 p-1">
                            <div className="relative flex size-12 items-center justify-center rounded-full border border-base-100/20 bg-primary shadow-lg">
                                <span className="text-xl font-extrabold text-primary-content">2</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-full">
                        <div className="h-1/2">
                            <img src={fma} alt="F=MA POTD" className="object-cover h-full w-full" />
                        </div>
                        <div className="h-1/2 p-4 text-white">
                            <h1 className="text-2xl font-semibold">F=MA POTD</h1>
                            <p className="text-gray-400">Daily physics problems at 9 AM PST, collaborate with others (aiming for 14k+ users)</p>
                        </div>
                    </div>
                </div>
                
                {/* Second Arrow */}
                <FaArrowRight className="text-gray-400 text-xl" />

                {/* Third Box */}
                <div className="flex-shrink-0 w-80 h-80 bg-custom-black border-4 border-gray-500 rounded-xl relative overflow-hidden">
                    <div className="absolute top-4 left-4">
                        <div className="rounded-full bg-base-100 p-1">
                            <div className="relative flex size-12 items-center justify-center rounded-full border border-base-100/20 bg-primary shadow-lg">
                                <span className="text-xl font-extrabold text-primary-content">3</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-full">
                        <div className="h-1/2">
                            <img src={ap} alt="AP POTD" className="object-cover h-full w-full" />
                        </div>
                        <div className="h-1/2 p-4 text-white">
                            <h1 className="text-2xl font-semibold">AP POTD</h1>
                            <p className="text-gray-400">Choose AP problems — AP Calc, APUSH, etc. Collaborate with peers, growing soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Elevate;