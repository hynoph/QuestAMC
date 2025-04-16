import React, { useEffect, useState } from "react";

type Problem = {
  number: number;
  statement: string;
  solution?: string;
};

const TestMock: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      const baseTitle = "2024 AMC 10B Problems/Problem ";
      const problemCount = 25; // max for AMC
      const all: Problem[] = [];

      for (let i = 1; i <= problemCount; i++) {
        try {
          const title = baseTitle + i;
          const html = await fetchProblemContent(title);
          const { statement, solution } = extractProblemAndSolution(html);
          all.push({ number: i, statement, solution });
        } catch (err) {
          console.warn(`Problem ${i} failed to load.`);
        }
      }

      setProblems(all);
      setLoading(false);
    };

    fetchProblems();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <span className="loading loading-spinner text-primary"></span>
        <p className="mt-2">Loading 2024 AMC 10B problems...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">2024 AMC 10B</h1>
      {problems.map((problem) => (
        <div key={problem.number} className="bg-base-200 rounded-xl p-4 space-y-3">
          <div className="text-lg font-semibold">Problem {problem.number}</div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: problem.statement }}
          />
          <input
            type="text"
            placeholder="Your answer"
            className="input input-bordered w-full max-w-xs"
          />
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-primary hover:underline">Show Solution</summary>
            <div
              className="mt-2 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: problem.solution ?? "<p>Solution not found.</p>" }}
            />
          </details>
        </div>
      ))}
    </div>
  );
};

export default TestMock;

// ------------------------------
// 🧠 Utilities
// ------------------------------

async function fetchProblemContent(title: string): Promise<string> {
  const apiUrl = `https://artofproblemsolving.com/wiki/api.php?action=parse&page=${encodeURIComponent(
    title
  )}&prop=text&formatversion=2&format=json&origin=*`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`API failed: ${res.status}`);
    const json = await res.json();
    return json?.parse?.text;
  } catch (err) {
    const proxy = "https://corsproxy.io/?" + encodeURIComponent(apiUrl);
    const proxyRes = await fetch(proxy);
    const proxyJson = await proxyRes.json();
    return proxyJson?.parse?.text;
  }
}

// 🔍 Extract between <h2>Problem</h2> and <h2>Solution</h2> or other sections
function extractProblemAndSolution(html: string): { statement: string; solution?: string } {
  const container = document.createElement("div");
  container.innerHTML = html;

  const children = Array.from(container.children);
  let startIdx = -1;
  let endIdx = -1;

  for (let i = 0; i < children.length; i++) {
    const txt = children[i].textContent?.trim().toLowerCase();
    if (startIdx === -1 && txt?.startsWith("problem")) {
      startIdx = i;
    } else if (txt?.startsWith("solution") || txt?.startsWith("== solution")) {
      endIdx = i;
      break;
    }
  }

  const statementEls = children.slice(startIdx, endIdx !== -1 ? endIdx : undefined);
  const solutionEls = endIdx !== -1 ? children.slice(endIdx) : [];

  const wrap = (els: Element[]) => {
    const div = document.createElement("div");
    els.forEach((el) => div.appendChild(el.cloneNode(true)));
    return div.innerHTML;
  };

  return {
    statement: wrap(statementEls),
    solution: solutionEls.length > 0 ? wrap(solutionEls) : undefined,
  };
}
