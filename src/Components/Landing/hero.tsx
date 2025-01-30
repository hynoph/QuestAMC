import React from 'react';
import { FaDiscord, FaCaretDown } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';
import ParagonX from '../../assets/paragonx_logo.png';
import OmegaLearn from '../../assets/omegalearn_logo.avif';
import Tmas from '../../assets/tmasacademy_logo.avif';
import Elevate from './elevate.tsx';
import Reviews from './reviews.tsx';
import Faq from './faq.tsx';
import Footer from './footer.tsx';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar.tsx';

const Hero: React.FC = () => {
    const shootingStars = Array.from({ length: 50 }).map((_, i) => (
        <div
            key={i}
            className="shooting-star"
            style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
            }}
        ></div>
    ));
    
    const navigate = useNavigate();
    return (
        <>
            {/* <div className="heading bg-custom-purple text-white font-semibold w-full fixed top-0 py-2 z-10 flex justify-center">
                <span className="block text-base">Beta Launch | Limited Products</span>
            </div> */}
            <Navbar />

            {/* Added mt-16 to create space below navbar */}
            <div className="relative mt-40">
                {/* Main content */}
                <div className="hero flex flex-col items-center justify-start min-h-screen text-center px-4">
                    {/* Star container now at the start of the content */}
                    <div className="star-container relative w-full h-40 overflow-hidden mb-6">
                        {shootingStars}
                    </div>

                    <div className="flex items-center bg-white border border-purple-600 rounded-md px-6 py-1 mb-6 relative z-10">
                        <FaDiscord className="text-xl text-purple-600" />
                        <div className="mx-4 flex flex-col items-center">
                            <span className="text-xs font-medium text-custom-purple">FIND US ON</span>
                            <span className="text-lg font-bold text-custom-purple">Discord</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaCaretDown className="text-purple-600" />
                            <span className="text-black text-xs mt-1">13</span>
                        </div>
                    </div>

                    <h1 className="text-8xl font-inter font-bold mb-6">Quest</h1>
                    <p className="text-xl max-w-2xl font-poppins mb-8">
                        Help students study for National Exams such as AMC and F=MA. Have over <strong>24k+</strong> users actively using the product. Connected with Organizations like Visionary, ParagonX, and more.
                    </p>

                    <div className="flex space-x-4 mb-16">
                        <button onClick={() => navigate('/login')} className="bg-custom-purple text-white font-medium py-2 px-6 rounded-md hover:bg-purple-700 transition duration-200">
                            Try Now
                        </button>
                        <button onClick={() => navigate('/login')} className="bg-custom-purple text-white font-medium border border-purple-600 py-2 px-6 rounded-md hover:bg-purple-600 hover:text-white transition duration-200">
                            Join Us
                        </button>
                    </div>

                    {/* Trust Section with Marquee */}
                    <div className="w-min text-center mb-8">
                        <h3 className="text-2xl font-medium text-white text-bold mb-8">
                            Trusted By Leading Non-Profits and Startups
                        </h3>
                        
                        <Marquee
                            gradient={false}
                            speed={40}
                            pauseOnHover={true}
                            className="py-4"
                        >
                            <div className="flex items-center space-x-16 mx-8">
                                <img 
                                    src={ParagonX} 
                                    alt="ParagonX Logo" 
                                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <img 
                                    src={OmegaLearn} 
                                    alt="OmegaLearn Logo" 
                                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <img 
                                    src={Tmas} 
                                    alt="Tmas Academy Logo" 
                                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <img 
                                    src={ParagonX} 
                                    alt="ParagonX Logo" 
                                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <img 
                                    src={OmegaLearn} 
                                    alt="OmegaLearn Logo" 
                                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <img 
                                    src={Tmas} 
                                    alt="Tmas Academy Logo" 
                                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </Marquee>
                    </div>
                </div>

                {/* Additional components */}
                <Elevate />
                <Reviews />
                <Faq />
                <Footer />
            </div>
        </>
    );
}

export default Hero;