import { createContext, useContext, useState } from "react";
import { signIn, signUp } from "../apiCalls/authCalls.js";

// ...existing code...
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // changed currentUser -> user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // SIGN UP
  const handleSignUp = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signUp(userData);
      if (data?.user) {
        setUser(data.user); // store user in state
        return data.user; // return user directly
      } else {
        throw new Error("Signup failed: Invalid response");
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Signup failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // SIGN IN
  const handleSignIn = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signIn(userData);
      if (data?.user) {
        setUser(data.user); // store user in state
        return data.user; // return user object for SignIn.jsx navigation
      } else {
        throw new Error("Signin failed: Invalid response");
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Signin failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        handleSignUp,
        handleSignIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for convenience
export const useAuth = () => useContext(AuthContext);
// ...existing code...