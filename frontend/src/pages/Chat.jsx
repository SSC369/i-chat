import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { io } from "socket.io-client";
import axios from "axios";
import Navbar from "../components/Navbar";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";

import ChatContainerSmall from "../components/ChatContainerSmall";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/apiRoutes";
import Welcome from "../components/Welcome";
import { useRef } from "react";

const Chat = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 992px)" });
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [response, setResponse] = useState("loading");
  const [contactsResponse, setContactsResponse] = useState("loading");
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const host = "https://i-chat-backend.onrender.com";
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const validate = async () => {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
      }
    };
    validate();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        setContactsResponse("success");
      }
    };
    getData();
    // eslint-disable-next-line
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setResponse("loading");
  };

  return (
    <>
      <Navbar />
      {isBigScreen ? (
        <div className="d-flex">
          <Contacts
            contactsResponse={contactsResponse}
            contacts={contacts}
            handleChatChange={handleChatChange}
          />

          {currentChat ? (
            <ChatContainer
              response={response}
              setResponse={setResponse}
              socket={socket}
              currentChat={currentChat}
            />
          ) : (
            <Welcome />
          )}
        </div>
      ) : (
        <div className="d-flex">
          {currentChat ? (
            <ChatContainerSmall
              response={response}
              setResponse={setResponse}
              setCurrentChat={setCurrentChat}
              socket={socket}
              currentChat={currentChat}
            />
          ) : (
            <Contacts
              contactsResponse={contactsResponse}
              contacts={contacts}
              handleChatChange={handleChatChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
