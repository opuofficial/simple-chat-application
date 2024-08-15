import React, { createContext, useEffect, useState } from "react";
import { getDataFromLocalstorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const userData = getDataFromLocalstorage();
    setUser(userData);
    setUserLoading(false);
  }, []);

  const values = { user, setUser, userLoading };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
