import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import { v4 as uuidv4 } from "uuid";
import { recieveMessageRoute } from "../utils/apiRoutes";
import "../styles/ChatContainer.css";
import ChatInput from "./ChatInput";
import { sendMessageRoute } from "../utils/apiRoutes";

const ChatContainer = ({ currentChat, socket, response, setResponse }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();
  //get messages from db with the current user

  useEffect(() => {
    const getData = async () => {
      const userData = await JSON.parse(localStorage.getItem("user"));
      const details = {
        from: userData._id,
        to: currentChat._id,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      };
      const response = await fetch(recieveMessageRoute, options);
      const data = await response.json();
      setMessages(data);
      setResponse("success");
    };

    getData();
    // eslint-disable-next-line
  }, [currentChat, response]);

  const handleSendMsg = async (msg) => {
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
    const data = await JSON.parse(localStorage.getItem("user"));
    //sending message event
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    // eslint-disable-next-line
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="User"
          />
        </div>
        <div className="username">
          <h3>{currentChat.username}</h3>
        </div>
      </div>

      {response === "success" ? (
        <ul className="chat-messages">
          {messages?.map((message) => {
            return (
              <li
                className={`${
                  message.fromSelf ? "sent-message" : "receive-message"
                }`}
                ref={scrollRef}
                key={uuidv4()}
              >
                <p>{message.message}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <Rings
            height="80"
            width="80"
            color="#ffffff"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      )}

      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
