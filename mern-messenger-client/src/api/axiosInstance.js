import { useContext, useMemo } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const useAxiosInstance = () => {
  const { user } = useContext(AuthContext);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:3001",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    if (user) {
      instance.interceptors.request.use(
        (config) => {
          config.headers["Authorization"] = `Bearer ${user.token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }

    return instance;
  }, [user]);

  return axiosInstance;
};

export default useAxiosInstance;
