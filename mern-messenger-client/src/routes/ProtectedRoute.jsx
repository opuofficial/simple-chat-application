import React, { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { user, userLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/auth/signin");
    }
  }, [user, userLoading]);

  if (user) {
    return element;
  } else {
    return null;
  }
};

export default ProtectedRoute;
