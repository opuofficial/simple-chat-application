import React, { useContext } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalContext } from "../providers/ModalProvider";

const NewConversationButton = () => {
  const { setIsOpen } = useContext(ModalContext);

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-3 w-full justify-center font-semibold text-lg rounded-md p-3 text-blue-950 bg-white shadow-md mt-3"
    >
      <FontAwesomeIcon icon={faPlus} />
      <span>New Conversation</span>
    </button>
  );
};

export default NewConversationButton;
