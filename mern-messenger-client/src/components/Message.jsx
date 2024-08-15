import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Message = ({ message }) => {
  const { user } = useContext(AuthContext);
  const { sender, text } = message;

  return (
    <div className={`flex mb-2 ${sender == user?.id && "justify-end"}`}>
      <span
        className={`${
          sender == user?.id ? "bg-blue-950 text-white" : "bg-white"
        } p-3 rounded-md`}
      >
        {text}
      </span>
    </div>
  );
};

export default Message;
