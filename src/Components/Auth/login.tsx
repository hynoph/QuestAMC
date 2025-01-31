// import { useEffect, useState } from "react";
// import { app } from "../../firebaseConfig.ts";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   User,
// } from "firebase/auth";
// import { FaGoogle } from "react-icons/fa"; // Importing the Google icon
// import Navbar from "../Landing/navbar.tsx";
// // import { useNavigate } from "react-router-dom";

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// const Login = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const navigate = useNavigate();

//   const handleLoginWithGoogle = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         setUser(result.user);
//         console.log(result.user);
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleEmailLogin = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((result) => {
//         setUser(result.user);
//         console.log("User logged in with email:", result.user);
//       })
//       .catch((error) => {
//         console.error("Error logging in with email:", error);
//         alert(error.message);
//       });
//   };

//   const handleEmailSignup = () => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((result) => {
//         setUser(result.user);
//         console.log("User registered with email:", result.user);
//       })
//       .catch((error) => {
//         console.error("Error signing up with email:", error);
//         alert(error.message);
//       });
//   };

//   const handleLogout = () => {
//     setUser(null);
//     auth.signOut();
//   };

//   useEffect(() => {
//     console.log(user);
//   }, [user]);

//   return (
//     <div className="flex h-screen">
//       <Navbar />
//       <div className="flex-1 flex flex-col justify-center mt-20 items-center px-8 py-16">
//         {/* Left side with login functionality */}
//         <div className="text-center w-full max-w-md space-y-6">
//           <div className="flex justify-center items-center mb-6">
//             <h1 className="text-4xl font-bold">Welcome to Quest LLC</h1>
//             {/* <img src={logo} alt="Quest Logo" className="w-12 h-12 ml-2" /> */}
//           </div>
//           {!user && (
//             <>
//               <button
//                 className="flex items-center justify-center bg-custom-purple text-white font-bold py-3 px-5 rounded shadow hover:shadow-lg transition w-full mb-6"
//                 onClick={handleLoginWithGoogle}
//               >
//                 <FaGoogle className="w-5 h-5 mr-2 text-purple-800" />
//                 <span className="text-base">Login with Google</span>
//               </button>
//               <div className="relative w-full my-6">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-400"></div>
//                 </div>
//                 <div className="relative flex justify-center text-gray-500">
//                   <span className="px-2 bg-transparent">or continue with</span>
//                 </div>
//               </div>
//               <form className="text-left w-full space-y-4" onSubmit={handleEmailLogin}>
//                 <div>
//                   <label className="text-white font-semibold text-sm mb-1 block">Email Address</label>
//                   <input
//                     type="text"
//                     placeholder="Type here"
//                     className="input input-bordered w-full bg-black text-white p-2 rounded"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-white font-semibold text-sm mb-1 block">Password</label>
//                   <input
//                     type="password"
//                     placeholder="Type here"
//                     className="input input-bordered w-full bg-black text-white p-2 rounded"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="flex items-center justify-center bg-custom-purple text-white font-bold py-3 px-5 rounded shadow hover:shadow-lg transition w-full"
//                 >
//                   Sign In
//                 </button>
//               </form>
//               <button
//                 className="flex items-center justify-center bg-custom-purple text-white font-bold py-3 px-5 rounded shadow hover:shadow-lg transition w-full"
//                 onClick={handleEmailSignup}
//               >
//                 Sign Up
//               </button>
//             </>
//           )}
//         </div>
//         {user && (
//           <div className="user text-center">
//             <h1 className="text-2xl font-bold">You're Successfully Logged In</h1>
//             <h2 className="text-xl">Name: {user.displayName}</h2>
//             <h2 className="text-xl">Email: {user.email}</h2>
//             <button onClick={handleLogout} className="logout bg-red-500 text-white py-2 px-4 rounded mt-4">
//               Log Out
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="flex-1 bg-custom-purple flex flex-col justify-center items-center px-8 py-16">
//         {/* Right side with content */}
//         <div className="text-center text-white space-y-4">
//           <h1 className="text-3xl font-bold">Unlock The Highest Score You Can</h1>
//           <p className="text-lg">Join thousands of students achieving their dream AMC Score with Quest</p>
//           <h2 className="text-2xl font-semibold">Quest Features:</h2>
//           <ul className="list-disc list-inside text-sm">
//             <li>AMC modules with detailed lectures, problems, and solutions</li>
//             <li>Saves your progress and allows you to pick up where you left off</li>
//             <li>Compete against others for the top score</li>
//             <li>Connect with 24,000+ peers and promote your achievements</li>
//             <li>Have mock AMCs for practice and saves mock scores for you</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useEffect, useState } from "react";
import { app } from "../../firebaseConfig.ts";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import Navbar from "../Landing/navbar.tsx";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Construct a serializable user object
  const getSerializableUser = (user: User) => ({
    displayName: user.displayName,
    email: user.email,
  });

  const redirectToDashboard = (user: User) => {
    const serializableUser = getSerializableUser(user);
    navigate("/dashboard", { state: { user: serializableUser } });
  };

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        redirectToDashboard(result.user);
      })
      .catch((error) => console.log(error));
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        redirectToDashboard(result.user);
      })
      .catch((error) => {
        console.error("Error logging in with email:", error);
        alert(error.message);
      });
  };

  const handleEmailSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        redirectToDashboard(result.user);
      })
      .catch((error) => {
        console.error("Error signing up with email:", error);
        alert(error.message);
      });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center mt-20 items-center px-8 py-16">
        <div className="text-center w-full max-w-md space-y-6">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-4xl font-bold">Welcome to Quest LLC</h1>
          </div>
          {!user && (
            <>
              <button
                className="flex items-center justify-center bg-custom-purple text-white font-bold py-3 px-5 rounded shadow hover:shadow-lg transition w-full mb-6"
                onClick={handleLoginWithGoogle}
              >
                <FaGoogle className="w-5 h-5 mr-2 text-purple-800" />
                <span className="text-base">Login with Google</span>
              </button>
              <div className="relative w-full my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-400"></div>
                </div>
                <div className="relative flex justify-center text-gray-500">
                  <span className="px-2 bg-transparent">or continue with</span>
                </div>
              </div>
              <form className="text-left w-full space-y-4" onSubmit={handleEmailLogin}>
                <div>
                  <label className="text-white font-semibold text-sm mb-1 block">Email Address</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full bg-black text-white p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-white font-semibold text-sm mb-1 block">Password</label>
                  <input
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered w-full bg-black text-white p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center bg-custom-purple text-white font-bold py-3 px-5 rounded shadow hover:shadow-lg transition w-full"
                >
                  Sign In
                </button>
              </form>
              <button
                className="flex items-center justify-center bg-custom-purple text-white font-bold py-3 px-5 rounded shadow hover:shadow-lg transition w-full"
                onClick={handleEmailSignup}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 bg-custom-purple flex flex-col justify-center items-center px-8 py-16">
        {/* Right side with content */}
        <div className="text-center text-white space-y-4">
          <h1 className="text-3xl font-bold">Unlock The Highest Score You Can</h1>
          <p className="text-lg">Join thousands of students achieving their dream AMC Score with Quest</p>
          <h2 className="text-2xl font-semibold">Quest Features:</h2>
          <ul className="list-disc list-inside text-sm">
            <li>AMC modules with detailed lectures, problems, and solutions</li>
            <li>Saves your progress and allows you to pick up where you left off</li>
            <li>Compete against others for the top score</li>
            <li>Connect with 24,000+ peers and promote your achievements</li>
            <li>Have mock AMCs for practice and saves mock scores for you</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;