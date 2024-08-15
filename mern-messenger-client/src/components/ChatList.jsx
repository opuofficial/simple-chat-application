import React, { useContext, useEffect } from "react";
import ChatPerson from "./ChatPerson";
import { ChatListContext } from "../providers/ChatListProvider";
import useAxiosInstance from "../api/axiosInstance";

const ChatList = () => {
  const { chatList, setChatList, chatListLoading, setChatListLoading } =
    useContext(ChatListContext);
  const axiosInstance = useAxiosInstance();

  const retrieveChats = async () => {
    try {
      const chats = await axiosInstance.get("/chats");
      console.log(chats.data);
      setChatList(chats.data || []);
      setChatListLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveChats();
  }, []);

  return (
    <div className="chat-list mt-5">
      {chatListLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {chatList?.map((person) => (
            <ChatPerson key={person._id} person={person} />
          ))}
        </>
      )}
    </div>
  );
};

export default ChatList;
