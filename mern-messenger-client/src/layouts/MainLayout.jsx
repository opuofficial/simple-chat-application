import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChatSidebar from "../components/ChatSidebar";
import SearchUserModal from "../components/SearchUserModal";
import { SocketContext } from "../providers/SocketProvider";
import { ChatListContext } from "../providers/ChatListProvider";

const MainLayout = () => {
  const { socket } = useContext(SocketContext);
  const { selectedChat, setSelectedChat, chatList, setChatList } =
    useContext(ChatListContext);

  useEffect(() => {
    if (socket == null) return;

    socket?.on("new-message", (newMessage) => {
      console.log("message from another person", newMessage); // newMessage.sender
      console.log(chatList); //chatList._id

      const chatExist = chatList.find((chat) => chat._id == newMessage.sender);
      console.log({ chatExist });

      if (!chatExist) {
        // if conversation doesn't exist
        setChatList((chats) => [
          { _id: newMessage.sender, username: newMessage.username },
          ...chats,
        ]);
      } else {
        // if conversation already exist than move to top
        const chatIndex = chatList.findIndex(
          (chat) => chat._id == newMessage.sender
        );
        const targetChat = chatList[chatIndex];
        chatList.splice(chatIndex, 1);
        setChatList((prev) => [targetChat, ...prev]);
      }
    });

    return () => socket?.off("new-message");
  }, [socket]);
  return (
    <div>
      <Navbar />
      <div className=" container max-w-5xl mx-auto">
        <div className="grid grid-cols-12">
          <div
            className="col-span-12 md:col-span-4 overflow-auto"
            style={{ height: `calc(100vh - 64px)` }}
          >
            <ChatSidebar />
          </div>
          <div
            className="md:col-span-8 hidden md:block"
            style={{ height: `calc(100vh - 64px)` }}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <SearchUserModal />
    </div>
  );
};

export default MainLayout;
