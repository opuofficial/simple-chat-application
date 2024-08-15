import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "../providers/ModalProvider";
import ChatPerson from "./ChatPerson";
import useAxiosInstance from "../api/axiosInstance";
import { useLocation } from "react-router-dom";
import { ChatListContext } from "../providers/ChatListProvider";

const SearchUserModal = () => {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const axiosInstance = useAxiosInstance();
  const location = useLocation();
  const { chatList, setChatList, setSelectedChat } =
    useContext(ChatListContext);

  const searchUser = async () => {
    try {
      const users = await axiosInstance.get(
        `/user/search?query=${searchQuery}`
      );

      setSearchResults(users.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToChatList = (person) => {
    // console.log({ person }); {_id: '66bdb1a1bbf98f0b94d3218e', username: 'das', isActive: true, sId: 'kgiem9A1vPGQco9LAAAJ', __v: 0}

    const chat = chatList.find((chat) => chat._id == person._id);

    if (!chat) {
      setChatList((list) => [person, ...list]);
    }

    setSelectedChat(person);
  };

  useEffect(() => {
    searchUser();
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  return (
    <>
      {isOpen && (
        <div className="h-screen w-screen left-0 top-0 fixed ">
          <div className=" h-full w-full bg-white overflow-auto">
            <div className="grid grid-cols-12">
              <div className="col-span-1 md:col-span-3"></div>

              <div className="col-span-10 md:col-span-6">
                <div className="flex justify-end text-4xl my-5">
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="p-3 rounded-md outline-none border w-full"
                    placeholder="Type username"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="search-results mt-3">
                  {searchResults.map((person) => (
                    <div
                      onClick={() => addToChatList(person)}
                      key={person?._id}
                    >
                      <ChatPerson person={person} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-1 md:col-span-3 "></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchUserModal;
