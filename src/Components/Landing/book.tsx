// import React, { useEffect } from "react";
// import pdf from "../../assets/mathland.pdf";
// import Navbar from './navbar';
// import {db} from "../../firebaseConfig";
// import { doc, increment, setDoc, updateDoc, getDoc} from "firebase/firestore";

// const Book: React.FC = () => {
//     // const [view, setView] = useState<number | null>(null);
    
//     const trackViewPage = async (path: string) => {
//         const ref = doc(db, "pageviews", path);

//         const docSnap = await getDoc(ref);
//         // if (docSnap.exists()) {
//         //     await updateDoc(ref, {
//         //         view: increment(1),
//         //     });
//         // } else {
//         //     await setDoc(ref, {
//         //         views: 1,
//         //     })
//         // }

//         if (docSnap.exists()) {
//             await updateDoc(ref, {
//                 views: increment(1),
//             });
//         } else {
//             await setDoc(ref, {
//                 views: 1,
//             });
//         }        
//     }
//     useEffect(() => {
//         trackViewPage("/book");
//     }, []);
//     return (
//         <>
//             <div className="mb-20">
//                 <Navbar />
//                 <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-36 mb-20">
//                 <h2 className="text-red-300 text-2xl text-center mb-5">Free AMC - AIME Book</h2>
//                 <h1 className="font-bold text-red-300 text-4xl mb-5">MathLand</h1>
//                 <p className="text-white text-sm mb-5">(Graciously Provided by Praneel Samal)</p>
//                 <div className="border-2 justify-center align-center rounded-lg shadow-lg p-4 mb-8">
//                     <iframe 
//                         src={pdf}
//                         className="w-[40vw] h-[90vh] rounded-md"
//                     />
//                 </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Book;

import React, { useEffect, useState } from "react";
import pdf from "../../assets/mathland.pdf";
import Navbar from './navbar';
import { db } from "../../firebaseConfig";
import { doc, increment, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const allowedEmails = [
  "korrapatigautham@gmail.com",
  "praneel.samal@gmail.com",
  // Add more allowed emails here
];

const Book: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [viewCount, setViewCount] = useState<number | null>(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, [auth]);

  const trackViewPage = async (path: string) => {
    const ref = doc(db, "pageviews", path);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      await updateDoc(ref, {
        views: increment(1),
      });
    } else {
      await setDoc(ref, {
        views: 1,
      });
    }

    // If user is allowed, fetch the current view count
    if (user?.email && allowedEmails.includes(user.email)) {
      const updatedSnap = await getDoc(ref);
      setViewCount(updatedSnap.data()?.views ?? null);
    }
  };

  useEffect(() => {
    trackViewPage("/book");
  }, [user]); // wait until user state is determined

  return (
    <>
      <div className="mb-20">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-36 mb-20">
          <h2 className="text-red-300 text-2xl text-center mb-5">Free AMC - AIME Book</h2>
          <h1 className="font-bold text-red-300 text-4xl mb-5">MathLand</h1>
          <p className="text-white text-sm mb-5">(Graciously Provided by Praneel Samal)</p>

          {user?.email && allowedEmails.includes(user.email) && viewCount !== null && (
            <p className="text-green-300 text-sm mb-4">
              Views: {viewCount}
            </p>
          )}

          <div className="border-2 justify-center align-center rounded-lg shadow-lg p-4 mb-8">
            <iframe
              src={pdf}
              className="w-[40vw] h-[90vh] rounded-md"
              title="MathLand"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;