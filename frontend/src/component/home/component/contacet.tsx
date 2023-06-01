import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import imgChat from "../../../image/chat.jpg";
import React, { useState } from "react";

const Contact = (props) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  return (
    <>
      <div className="contact">
        <FontAwesomeIcon
          className={`star ${isActive ? "active" : ""}`}
          onClick={handleClick}
          icon={faHeadset}
        />
        {/* <img
          src={imgChat}
          onClick={handleClick}
          className={`star ${isActive ? "active" : ""}`}
          alt=""
        /> */}
        <div className="icon">
          {/* <NavLink to="">
            <span className="co">Chat</span>
            <FontAwesomeIcon icon={faComment} />
          </NavLink> */}
          <NavLink
            target="_blank"
            onClick={handleClick}
            to="https://t.me/Whale4trade"
          >
            <span className="co">Telegram</span>
            <FontAwesomeIcon icon={faTelegram} />
          </NavLink>
          {/* <NavLink to="/">
            <span className="co">Instagram</span>
            <FontAwesomeIcon icon={faInstagram} />
          </NavLink> */}
          {/* <NavLink to="/">
            <span className="co">Discord</span>
            <FontAwesomeIcon icon={faDiscord} />
          </NavLink> */}
          {/* <NavLink to="/">
            <span className="co">Whatsapp</span>
            <FontAwesomeIcon icon={faWhatsapp} />
          </NavLink> */}
          {/* <NavLink to="/">
            <span className="co">Tiktok</span>
            <FontAwesomeIcon icon={faTiktok} />
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default Contact;
