import React from "react";
import { Rings } from "react-loader-spinner";
import "../styles/Contacts.css";

const Contacts = (props) => {
  const { handleChatChange, contacts, contactsResponse } = props;

  const { users } = contacts;

  return (
    <div className="contacts">
      {contactsResponse === "success" ? (
        <ul className="contacts-container p-4">
          {users?.map((item) => (
            <li
              key={item._id}
              onClick={() => handleChatChange(item)}
              className="text-dark shadow"
            >
              <img
                src={`data:image/svg+xml;base64,${item.avatarImage}`}
                alt="img"
              />
              <p>{item.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="d-flex align-items-center justify-content-center w-100">
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
    </div>
  );
};

export default Contacts;
