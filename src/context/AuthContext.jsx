import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const logout = () => auth.signOut();
  const updateEmail = (email) => currentUser.updateEmail(email);
  const updatePassword = (password) => currentUser.updatePassword(password);
  const resetPassword = (email) => auth.sendPasswordResetEmail(email);
  const signup = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  const login = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
