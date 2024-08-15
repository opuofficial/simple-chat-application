import React, { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { AuthContext } from "./AuthProvider";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { user, userLoading } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let socket;
    if (!userLoading) {
      socket = socketIOClient("http://localhost:3001", {
        query: {
          token: user?.token,
        },
      });

      setSocket(socket);
    }

    return () => {
      socket?.disconnect();
    };
  }, [user, userLoading]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
