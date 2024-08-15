import React, { useContext, useState } from "react";
import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import useAxiosInstance from "../api/axiosInstance";
import { setDataToLocalstorage } from "../utils/localStorage";
import { AuthContext } from "../providers/AuthProvider";

const Signin = () => {
  const [errorFromServer, setErrorFromServer] = useState(null);
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const { setUser } = useContext(AuthContext);

  const getAuthCredentials = async ({ username, password }) => {
    try {
      const response = await axiosInstance.post("/user/signin", {
        username,
        password,
      });

      if (response.status == 200) {
        setDataToLocalstorage(response.data);
        setUser(response.data);
        navigate("/messages");
      }
    } catch (error) {
      console.log(error);
      setErrorFromServer(error.response.data.message);
    }
  };

  return (
    <div
      className="h-screen flex items-center"
      style={{ height: `calc(100vh - 64px)` }}
    >
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-12">
          <div
            className="col-start-2 col-end-12 sm:col-start-3 sm:col-end-11 
            md:col-start-4
            md:col-end-10
           lg:col-start-5 lg:col-end-9"
          >
            <AuthForm
              buttonText="Sign in"
              getAuthCredentials={getAuthCredentials}
              errorFromServer={errorFromServer}
            />
            <div className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="font-semibold">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
