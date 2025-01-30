import { useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
// import firebase from "firebase/app";
import { auth } from "../firebaseSetup";
import { User } from "firebase/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};