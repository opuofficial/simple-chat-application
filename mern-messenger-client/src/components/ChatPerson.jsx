import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ChatPerson = ({ person }) => {
  console.log(person);

  return (
    <Link to={`/messages/${person._id}`}>
      <div className="chat-list-item py-5 flex items-center gap-5 text-xl cursor-pointer border-b font-semibold">
        <FontAwesomeIcon icon={faUser} />
        <span>{person.username}</span>
      </div>
    </Link>
  );
};

export default ChatPerson;
