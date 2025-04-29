// src/hooks/useProblems.ts
import { useEffect, useState } from "react";

export type ProblemEntry = string;

// const groupProblemsByMock = (problems: string[]) => {
//     const grouped: { [mock: string]: string[] } = {};
  
//     for (const title of problems) {
//       const match = title.match(/^(\d{4} AMC (10|12)[AB]?) Problems\/Problem \d+/);
//       if (match) {
//         const mockName = match[1]; // e.g., "2012 AMC 10A"
//         if (!grouped[mockName]) grouped[mockName] = [];
//         grouped[mockName].push(title);
//       }
//     }
  
//     // sort problems by number within each mock
//     for (const key in grouped) {
//       grouped[key].sort((a, b) => {
//         const numA = parseInt(a.match(/Problem (\d+)/)![1]);
//         const numB = parseInt(b.match(/Problem (\d+)/)![1]);
//         return numA - numB;
//       });
//     }
  
//     return grouped;
//   };  

export const useProblems = () => {
  const [problems, setProblems] = useState<ProblemEntry[]>([]);

  useEffect(() => {
    fetch("./backend/data/allproblems.json")
      .then((res) => res.json())
      .then(setProblems)
      .catch(console.error);
  }, []);

  return problems;
};
