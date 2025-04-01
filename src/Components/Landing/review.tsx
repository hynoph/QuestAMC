// import React from "react";
// import Navbar from './navbar';
// // import f from "../../assets/anikanotes.pdf"

// const Review: React.FC = () => {
//     const pdf = "/anikanotes.pdf";
//     return (
//         <>
//             <div className="mb-20">
//                 <Navbar />
//                 <div>
//                     <h1 className="container mx-auto mt-36 text-center font-bold text-4xl">Review of Topics before Competitions!</h1>
//                     {/* <Document file={pdf} /> */}
//                     {/* <PdfViewer /> */}
//                     <iframe className="justify-center align-center" src={pdf} width="50%" height="300px" />
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Review;

import React from "react";
import Navbar from './navbar';

const Review: React.FC = () => {
    const pdf = "/anikanotes.pdf";

    return (
        <>
            <div className="mb-20">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-36">  
                    <h1 className="text-center font-bold text-4xl mb-8">
                        Review of Topics before Competitions!
                    </h1>
                    <div className="border-2 rounded-lg shadow-lg p-4 mb-8">
                        <iframe 
                            src={pdf} 
                            className="w-[40vw] h-[90vh] rounded-md"
                        />
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-lg mb-4">(Credits to Anika Patel for formulating and updating this pdf constantly)</p>
                        <p className="text-xl font-semibold mb-2">Updated: March 31, 2025</p>
                        <p className="text-lg mb-6">
                            The theorem and formula review page covers the most important concepts on the AMC 10/12 exam and AIME I/II and includes 100s of examples and theorems to learn from.
                        </p>
                        <p className="text-lg font-semibold mb-4">This book covers the following topics:</p>
                        <ul className="text-lg list-disc list-inside mb-6">
                            <li>Combinatorics</li>
                            <li>Algebra</li>
                            <li>Number Theory</li>
                            <li>Geometry</li>
                            <li>Logarithms</li>
                            <li>Trigonometry</li>
                            <li>Complex Numbers</li>
                        </ul>
                        <p className="text-sm mb-4">
                            Feedback: We would love to hear how this pdf and explanations have helped you and how we can improve it. Please share your feedback at this link.
                        </p>
                        <p className="text-sm">
                            Note: This book is a work in progress and new chapters and problems will be added regularly, so please remember to bookmark this page and check often to get the latest version of the book.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Review;
