// // import React from "react";
// // import Navbar from "./navbar";
// // import { TfiAgenda } from "react-icons/tfi";


// // const Module: React.FC = () => {
// //   return (
// //     <>
// //       <Navbar/>
// //       <div className="flex">
// //         {/* Sidebar */}
// //         <div className="w-65 bg-white p-6 flex flex-col shadow-lg rounded-lg mt-40 ml-10 font-poppins" style={{ maxHeight: '85vh' }}>
// //           {/* Title and Line */}
// //           <h2 className="text-center font-bold text-xl mb-2 text-custom-purple">Comp Math</h2>
// //           <hr className="border-gray-300 mb-4" />

// //           {/* Section Header with Navigation Brackets */}
// //           <div className="flex items-center justify-between mb-4">
// //             <button className="cursor-pointer text-custom-purple text-lg bg-transparent">&lt;</button>
// //             <div className="flex flex-col items-center mx-4">
// //               <span className="text-xs text-custom-purple mb-1">Section: Comp Math</span>
// //               <p className="text-sm text-custom-purple">Lesson 3: Introduction to Angle Chasing</p>
// //             </div>
// //             <button className="cursor-pointer text-custom-purple text-lg bg-transparent">&gt;</button>
// //           </div>
// //           <hr className="border-gray-300 mb-6 w-full" />

// //           {/* List of Lessons */}
// //           {[...Array(8)].map((_, i) => (
// //             <React.Fragment key={i}>
// //               <div className="flex items-center justify-center my-2">
// //                 <TfiAgenda className="text-sm mr-2 text-gray-600" />
// //                 <p className="text-left text-sm text-gray-600">What are angles?</p>
// //               </div>
// //               <hr className="border-gray-200 mt-2 mb-4 w-full" />
// //             </React.Fragment>
// //           ))}

// //           {/* Footer with Links */}
// //           <div className="mt-auto text-center text-xs text-gray-500">
// //             <p className="mb-2">&copy; 2025 Quest</p>
// //             <div className="flex justify-center space-x-2 underline">
// //               <a href="#" className="hover:text-gray-700">Terms of Use</a>
// //               <a href="#" className="hover:text-gray-700">Privacy Policy</a>
// //               <a href="#" className="hover:text-gray-700">Cookie Notice</a>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="flex-1 p-6">
// //           <h1>Main Content Area</h1>
// //           {/* Additional content can go here */}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Module;

// import React, { useEffect, useState } from "react";
// import Navbar from "./navbar";
// import { TfiAgenda } from "react-icons/tfi";
// import Latex from "react-latex-next";
// import mathjax from "mathjax";

// const Module: React.FC = () => {
//   const [latexContent, setLatexContent] = useState('');

//   useEffect(() => {
//     // Simulating loading of a .tex file
//     fetch("./src/Components/Latex/test.tex")
//       .then(response => response.text())
//       .then(data => {
//         setLatexContent(data);
//       })
//       .catch(error => console.error('Error loading the LaTeX file:', error));
//   }, []);

//   return (
//     <>
//       <Navbar/>
//       <div className="flex">
//         {/* Sidebar */}
//         <div className="w-64 bg-white p-6 flex flex-col shadow-lg rounded-lg mt-40 ml-10 font-poppins" style={{ maxHeight: '85vh' }}>
//           {/* Title and Line */}
//           <h2 className="text-center font-bold text-xl mb-2 text-custom-purple">Comp Math</h2>
//           <hr className="border-gray-300 mb-4" />

//           {/* Section Header with Navigation Brackets */}
//           <div className="flex items-center justify-between mb-4">
//             <button className="cursor-pointer text-custom-purple text-lg bg-transparent">&lt;</button>
//             <div className="flex flex-col items-center mx-4">
//               <span className="text-xs text-custom-purple mb-1">Section: Comp Math</span>
//               <p className="text-sm text-custom-purple">Lesson 3: Introduction to Angle Chasing</p>
//             </div>
//             <button className="cursor-pointer text-custom-purple text-lg bg-transparent">&gt;</button>
//           </div>
//           <hr className="border-gray-300 mb-6 w-full" />

//           {/* List of Lessons */}
//           {[...Array(6)].map((_, i) => (
//             <React.Fragment key={i}>
//               <div className="flex items-center justify-center my-2">
//                 <TfiAgenda className="text-sm mr-2 text-gray-600" />
//                 <p className="text-left text-sm text-gray-600">What are angles?</p>
//               </div>
//               <hr className="border-gray-200 mt-2 mb-4 w-full" />
//             </React.Fragment>
//           ))}

//           {/* Footer with Links */}
//           <div className="mt-auto text-center text-xs text-gray-500">
//             <p className="mb-2">&copy; 2025 Quest</p>
//             <div className="flex justify-center space-x-2 underline">
//               <a href="#" className="hover:text-gray-700">Terms of Use</a>
//               <a href="#" className="hover:text-gray-700">Privacy Policy</a>
//               <a href="#" className="hover:text-gray-700">Cookie Notice</a>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-6">
//           <h1>Main Content Area</h1>
//           {/* Render the LaTeX content */}
//           <div className="mt-10">
//             <Latex>{latexContent}</Latex>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Module;

import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { TfiAgenda } from "react-icons/tfi";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useNavigate } from "react-router-dom";

const Module: React.FC = () => {
  const [latexContent, setLatexContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("./src/Components/Latex/test.tex")  // Ensure this path is correct
      .then(response => response.text())
      .then(data => {
        // Ensuring that the LaTeX content is wrapped properly with delimiters
        setLatexContent(`$$${data}`);
      })
      .catch(error => console.error('Error loading the LaTeX file:', error));
  }, []);

  const mathJaxConfig = {
    // Configure MathJax here if necessary
    tex: { 
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
    },
  };

  return (
    <MathJaxContext config={mathJaxConfig}>
      <Navbar/>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white p-6 flex flex-col shadow-lg rounded-lg mt-40 ml-10 font-poppins" style={{ maxHeight: '85vh' }}>
          <h2 className="text-center font-bold text-xl mb-2 text-custom-purple">Comp Math</h2>
          <hr className="border-gray-300 mb-4" />
          <div className="flex items-center justify-between mb-4">
            <button className="cursor-pointer text-custom-purple text-lg bg-transparent">&lt;</button>
            <div className="flex flex-col items-center mx-4">
              <span className="text-xs text-custom-purple mb-1">Section: Comp Math</span>
              <p className="text-sm text-custom-purple">Lesson 3: Introduction to Angle Chasing</p>
            </div>
            <button className="cursor-pointer text-custom-purple text-lg bg-transparent">&gt;</button>
          </div>
          <hr className="border-gray-300 mb-6 w-full" />
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center justify-center my-2">
                <TfiAgenda className="text-sm mr-2 text-gray-600" />
                <p className="text-left text-sm text-gray-600">What are angles?</p>
              </div>
              <hr className="border-gray-200 mt-2 mb-4 w-full" />
            </React.Fragment>
          ))}
          <div className="mt-auto text-center text-xs text-gray-500">
            <p className="mb-2">&copy; 2025 Quest</p>
            <div className="flex justify-center space-x-2 underline">
              <a href="#" className="hover:text-gray-700">Terms of Use</a>
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Cookie Notice</a>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1>Main Content Area</h1>
          {/* Render the LaTeX content */}
          <div className="mt-10">
            <MathJax>
              <div>{latexContent}</div>
            </MathJax>
          </div>
        </div>
        <button onClick={() => navigate('/modules/mocks')}>
          Mocks
        </button>
      </div>
    </MathJaxContext>
  );
};

export default Module;