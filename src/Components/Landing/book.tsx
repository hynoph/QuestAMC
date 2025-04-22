import React, { useEffect, useState } from "react";
import pdf from "../../assets/mathland.pdf";
import Navbar from "./navbar";
import { db } from "../../firebaseConfig";
import { doc, increment, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Book: React.FC = () => {
    const [views, setViews] = useState<number | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const allowedEmails = ["korrapatigautham@gmail.com", "praneel.samal@gmail.com"];

    const trackViewPage = async (path: string) => {
        try {
            const ref = doc(db, "pageviews", path);
            const docSnap = await getDoc(ref);
    
            if (docSnap.exists()) {
                await updateDoc(ref, {
                    views: increment(1),
                });
                const updatedSnap = await getDoc(ref);
                const newViews = updatedSnap.data()?.views;
                console.log("Updated views:", newViews); // ✅ DEBUG LOG
                setViews(newViews);
            } else {
                await setDoc(ref, {
                    views: 1,
                });
                console.log("Initialized views to 1"); // ✅ DEBUG LOG
                setViews(1);
            }
        } catch (err) {
            console.error("Error tracking views:", err);
        }
    };    

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                if (allowedEmails.includes(user.email!)) {
                    trackViewPage("/book");
                }
            }
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

    if (!allowedEmails.includes(userEmail || "")) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
                <Navbar />
                <h1 className="text-2xl font-bold text-red-400 mt-10">Access Denied</h1>
                <p className="text-white mt-4 text-center">You are not authorized to view this page.</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-20">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-36 mb-20">
                    <h2 className="text-red-300 text-2xl text-center mb-5">Free AMC - AIME Book</h2>
                    <h1 className="font-bold text-red-300 text-4xl mb-2">MathLand</h1>
                    <p className="text-white text-sm mb-1">(Graciously Provided by Praneel Samal)</p>
                    {views !== null && (
                        <p className="text-white text-sm mb-5">👁️ Views: {views}</p>
                    )}
                    <div className="border-2 justify-center align-center rounded-lg shadow-lg p-4 mb-8">
                        <iframe 
                            src={pdf}
                            className="w-[40vw] h-[90vh] rounded-md"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;