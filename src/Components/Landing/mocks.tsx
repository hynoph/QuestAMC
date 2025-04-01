// import React, { useState, useEffect } from "react";
// import problems from "../../../backend/AMC/10/amc10problems.json";
// import allproblems from "../../../backend/data/allproblems.json";

// const Mocks: React.FC = () => {
//     // Get a random problem from allproblems
//     const getRandomProblem = () => {
//         const randomIndex = Math.floor(Math.random() * allproblems.length);
//         return allproblems[randomIndex];
//     };

//     // Example: "2002 AMC 10A Problems/Problem 1"
//     const problemTitle = getRandomProblem();
    
//     // Parse the title to get year, test type, and problem number
//     const year = problemTitle.match(/^\d{4}/)[0];
//     const isA = problemTitle.includes("A Problems");
//     const problemNumber = problemTitle.match(/\d+$/)[0];

//     // Access the problem data using the parsed information
//     // const yearData = problems[year];
//     const problemsData = yearData && yearData[isA ? "A" : "B"] && yearData[isA ? "A" : "B"][problemNumber];
    
//     return (
//         <>
//             <h3>Problem Title: {problemTitle}</h3>
//             {problemsData ? (
//                 <>
//                     <div>
//                         <h2>Problem: </h2>
//                         <div dangerouslySetInnerHTML={{ __html: problemsData.problem_statement }} />
//                     </div>
//                 </>
//             ): (
//                 <p>Problem was not found</p>
//             )}
//         </>
//     );
// }

// export default Mocks;

import React, { useState, useEffect } from "react";

interface Problem {
    heading: string;
    content: string;
}

const Mocks: React.FC = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const scrapeProblems = async () => {
        try {
            // Using a CORS proxy (for development purposes)
            const corsProxy = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://amctrivial.com/?problems=2022_AMC_10A_Problems/Problem_1|2022_AMC_10A_Problems/Problem_2|2022_AMC_10A_Problems/Problem_3|2022_AMC_10A_Problems/Problem_4|2022_AMC_10A_Problems/Problem_5|2022_AMC_10A_Problems/Problem_6|2022_AMC_10A_Problems/Problem_7|2022_AMC_10A_Problems/Problem_8|2022_AMC_10A_Problems/Problem_9|2022_AMC_10A_Problems/Problem_10|2022_AMC_10A_Problems/Problem_11|2022_AMC_10A_Problems/Problem_12|2022_AMC_10A_Problems/Problem_13|2022_AMC_10A_Problems/Problem_14|2022_AMC_10A_Problems/Problem_15|2022_AMC_10A_Problems/Problem_16|2022_AMC_10A_Problems/Problem_17|2022_AMC_10A_Problems/Problem_18|2022_AMC_10A_Problems/Problem_19|2022_AMC_10A_Problems/Problem_20|2022_AMC_10A_Problems/Problem_21|2022_AMC_10A_Problems/Problem_22|2022_AMC_10A_Problems/Problem_23|2022_AMC_10A_Problems/Problem_24|2022_AMC_10A_Problems/Problem_25&testyear=2022&testname=AMC%2010A';
            
            const response = await fetch(corsProxy + targetUrl, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            const text = await response.text();
            
            // Parse the HTML string
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            
            // Find all problem articles
            const problemsSection = doc.querySelector('.problems-section');
            const articleProblems = problemsSection?.querySelectorAll('.article-problems');
            
            if (articleProblems) {
                const extractedProblems = Array.from(articleProblems).map(article => {
                    const heading = article.querySelector('.problem-heading')?.textContent || '';
                    const content = article.querySelector('p')?.innerHTML || '';
                    
                    return {
                        heading: heading.trim(),
                        content: content.trim()
                    };
                });
                
                setProblems(extractedProblems);
            }
        } catch (error) {
            console.error("Error scraping problems:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        scrapeProblems();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6">
            {loading ? (
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                    <p className="mt-4">Loading problems...</p>
                </div>
            ) : problems.length > 0 ? (
                <div className="space-y-6">
                    {problems.map((problem, index) => (
                        <div 
                            key={index}
                            className="bg-slate-800 rounded-lg p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-4">
                                {problem.heading}
                            </h2>
                            <div 
                                className="text-white prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: problem.content }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-white">
                    <p>No problems found</p>
                    <button 
                        onClick={scrapeProblems}
                        className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            )}
        </div>
    );
};

export default Mocks;
