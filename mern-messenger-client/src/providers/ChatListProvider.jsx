import React, { createContext, useEffect, useState } from "react";

export const ChatListContext = createContext();

const ChatListProvider = ({ children }) => {
  const [chatList, setChatList] = useState([]);
  const [chatListLoading, setChatListLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState({});

  const values = {
    chatList,
    setChatList,
    chatListLoading,
    setChatListLoading,
    selectedChat,
    setSelectedChat,
  };

  return (
    <ChatListContext.Provider value={values}>
      {children}
    </ChatListContext.Provider>
  );
};

export default ChatListProvider;
