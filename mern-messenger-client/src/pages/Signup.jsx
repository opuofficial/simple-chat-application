import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import useAxiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const Signup = () => {
  const [errorFromServer, setErrorFromServer] = useState(null);
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const getAuthCredentials = async ({ username, password }) => {
    try {
      const response = await axiosInstance.post("/user/signup", {
        username,
        password,
      });

      if (response.status == 201) {
        toast.success(response.data.message);
        navigate("/auth/signin");
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
              buttonText="Create account"
              getAuthCredentials={getAuthCredentials}
              errorFromServer={errorFromServer}
            />
            <div className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/auth/signin" className="font-semibold">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
