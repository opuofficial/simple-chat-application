import React from "react";
import NewConversationButton from "./NewConversationButton";
import ChatList from "./ChatList";

const ChatSidebar = () => {
  return (
    <div className="p-3">
      <NewConversationButton />
      <div className="text-3xl font-semibold mt-5">Chats</div>
      <ChatList />
    </div>
  );
};

export default ChatSidebar;
