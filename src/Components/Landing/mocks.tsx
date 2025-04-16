// import React, { useEffect, useState } from "react";
import Example from "./Mocks/2024_amc_10_b";
// import 2024_amc_2024_10_b

// type ProblemEntry = string;
// type GroupedProblems = { [mock: string]: string[] };

const Mocks: React.FC = () => {
  return (
    <>
      <Example />
    </>
  )
}

export default Mocks;

// const Mocks: React.FC = () => {
//   const [problems, setProblems] = useState<ProblemEntry[]>([]);
//   const [grouped, setGrouped] = useState<GroupedProblems>({});
//   const [selectedMock, setSelectedMock] = useState<string | null>(null);
//   const [problemContents, setProblemContents] = useState<{ [title: string]: string }>({});
//   const [loadingStates, setLoadingStates] = useState<{ [title: string]: 'loading' | 'loaded' | 'error' }>({});

//   useEffect(() => {
//     const loadProblems = async () => {
//       try {
//         const res = await fetch("../../../backend/data/allproblems.json");
//         if (!res.ok) {
//           throw new Error(`Failed to load problems: ${res.status} ${res.statusText}`);
//         }
//         const raw = await res.json();
//         setProblems(raw);
//         setGrouped(groupProblemsByMock(raw));
//       } catch (error) {
//         console.error("Error loading problems:", error);
//       }
//     };
//     loadProblems();
//   }, []);

//   useEffect(() => {
//     const fetchContents = async () => {
//       if (!selectedMock) return;
      
//       const titles = grouped[selectedMock] ?? [];
      
//       const initialLoadingStates: { [title: string]: 'loading' | 'loaded' | 'error' } = {};
//       titles.forEach(title => {
//         initialLoadingStates[title] = 'loading';
//       });
//       setLoadingStates(initialLoadingStates);
      
//       for (const title of titles) {
//         try {
//           const html = await fetchProblemContent(title);
//           setProblemContents(prev => ({
//             ...prev,
//             [title]: html
//           }));
//           setLoadingStates(prev => ({
//             ...prev,
//             [title]: 'loaded'
//           }));
//         } catch (error) {
//           console.error(`Error fetching ${title}:`, error);
//           setLoadingStates(prev => ({
//             ...prev,
//             [title]: 'error'
//           }));
//         }
//       }
//     };
    
//     fetchContents();
//   }, [selectedMock, grouped]);

//   const renderLoadingState = (title: string) => {
//     const state = loadingStates[title];
//     if (state === 'loading') {
//       return (
//         <div className="flex items-center justify-center p-4">
//           <div className="loading loading-spinner text-primary"></div>
//           <span className="ml-2">Loading problem...</span>
//         </div>
//       );
//     } else if (state === 'error') {
//       return (
//         <div className="text-error p-4">
//           Failed to load problem. Please try again later.
//         </div>
//       );
//     } else {
//       return (
//         <div
//           className="prose max-w-none"
//           dangerouslySetInnerHTML={{ __html: problemContents[title] ?? "" }}
//         />
//       );
//     }
//   };

//   if (!selectedMock) {
//     return (
//       <div className="grid gap-4 p-4">
//         {Object.keys(grouped).length === 0 ? (
//           <div className="flex items-center justify-center p-8">
//             <div className="loading loading-spinner text-primary"></div>
//             <span className="ml-2">Loading mock exams...</span>
//           </div>
//         ) : (
//           Object.keys(grouped).map((mockName) => (
//             <div
//               key={mockName}
//               className="bg-base-200 p-4 rounded-lg shadow cursor-pointer hover:bg-base-300 transition"
//               onClick={() => setSelectedMock(mockName)}
//             >
//               <h2 className="text-lg font-semibold">{mockName}</h2>
//               <div className="text-sm text-gray-500">{grouped[mockName]?.length} problems</div>
//             </div>
//           ))
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 space-y-6">
//       <button
//         onClick={() => {
//           setSelectedMock(null);
//           setProblemContents({});
//         }}
//         className="btn btn-sm btn-outline mb-2"
//       >
//         ← Back
//       </button>
//       <h2 className="text-2xl font-bold">{selectedMock}</h2>
//       <div className="space-y-4">
//         {(grouped[selectedMock] ?? []).map((title, i) => (
//           <div key={title} className="bg-base-200 p-4 rounded-lg space-y-3">
//             <div className="text-md font-semibold">Problem {i + 1}</div>
//             {renderLoadingState(title)}
//             <div className="flex gap-2 flex-wrap">
//               {["A", "B", "C", "D", "E"].map((opt) => (
//                 <button key={opt} className="btn btn-sm btn-outline">
//                   {opt}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Mocks;

// // Group problems by mock name like "2022 AMC 10A"
// function groupProblemsByMock(problems: string[]): GroupedProblems {
//   const grouped: GroupedProblems = {};
//   for (const title of problems) {
//     const match = title.match(/^(\d{4} (AMC|AHSME) ?(10|12)?[AB]?) Problems\/Problem \d+/);
//     if (match) {
//       const mockName = match[1];
//       if (!grouped[mockName]) grouped[mockName] = [];
//       grouped[mockName].push(title);
//     }
//   }
//   for (const key in grouped) {
//     grouped[key].sort((a, b) => {
//       const numA = parseInt(a.match(/Problem (\d+)/)?.[1] || "0");
//       const numB = parseInt(b.match(/Problem (\d+)/)?.[1] || "0");
//       return numA - numB;
//     });
//   }
//   return grouped;
// }

// // ✂️ Extract only the problem statement (not the solution)
// async function fetchProblemContent(title: string): Promise<string> {
//   const apiUrl = `https://artofproblemsolving.com/wiki/api.php?action=parse&page=${encodeURIComponent(
//     title
//   )}&prop=text&formatversion=2&format=json&origin=*`;

//   try {
//     const res = await fetch(apiUrl);
//     if (!res.ok) throw new Error(`API request failed: ${res.status} ${res.statusText}`);
//     const json = await res.json();

//     let html = json?.parse?.text;
//     if (!html) throw new Error("Invalid response format from API");

//     return extractProblemOnly(html);
//   } catch (err) {
//     try {
//       const proxy = "https://corsproxy.io/?" + encodeURIComponent(apiUrl);
//       const proxyRes = await fetch(proxy);
//       if (!proxyRes.ok) throw new Error(`Proxy request failed: ${proxyRes.status} ${proxyRes.statusText}`);
//       const proxyJson = await proxyRes.json();
//       const html = proxyJson?.parse?.text;
//       if (!html) throw new Error("Invalid response from proxy");

//       return extractProblemOnly(html);
//     } catch (proxyErr) {
//       console.error("Proxy fallback also failed:", proxyErr);
//       throw new Error(`Failed to load problem: ${err.message}`);
//     }
//   }
// }

// // 🧠 Extract only the part between "Problem" and "Solution"
// function extractProblemOnly(html: string): string {
//   const container = document.createElement("div");
//   container.innerHTML = html;

//   const children = Array.from(container.children);
//   const startIdx = children.findIndex(child =>
//     child.textContent?.trim().toLowerCase().startsWith("problem")
//   );
//   const endIdx = children.findIndex(child =>
//     child.textContent?.trim().toLowerCase().startsWith("solution")
//   );

//   const sliced = children.slice(
//     startIdx !== -1 ? startIdx : 0,
//     endIdx !== -1 ? endIdx : undefined
//   );

//   const resultContainer = document.createElement("div");
//   sliced.forEach(el => resultContainer.appendChild(el.cloneNode(true)));

//   return resultContainer.innerHTML;
// }
