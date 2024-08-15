import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { removeDataFromLocalstorage } from "../utils/localStorage";

const Navbar = () => {
  const { user, userLoading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    removeDataFromLocalstorage();
    navigate("/auth/signin");
  };

  return (
    <div className="bg-blue-950 text-white py-5 shadow-sm">
      <div className="container px-3 max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <span className="font-bold">MERNmessenger</span>
        </div>
        {!userLoading && (
          <>
            <div>
              {user ? (
                <div className="flex items-center gap-5">
                  <div className="font-bold text-lg uppercase">
                    {user.username}
                  </div>
                  <div
                    className="font-bold text-lg cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              ) : (
                <>
                  <nav className="font-semibold flex gap-5">
                    <Link to="/auth/signin">Sign in</Link>
                    <Link to="/auth/signup">Create Account</Link>
                  </nav>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
