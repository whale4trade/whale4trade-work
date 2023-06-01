import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import env from "../../../environments/enviroments";
import { useState, useEffect } from "react";

const URL = (props) => {
  const text = `${env.aff}/register/aff/${JSON.parse(localStorage.user).id}`;
  const [isActive, setIsActive] = useState<any>(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setIsActive((current) => !current);
    setTimeout(() => {
      setIsActive("");
    }, 3000);
  };

  return (
    <div className="url">
      <span>URL:</span>

      <button
        type="button"
        onClick={() => copy()}
        className="btn btn-primary"
        id="liveToastBtn"
      >
        {`${env.aff}/register/aff/${JSON.parse(localStorage.user).id}`}
      </button>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className={`toast fade ${isActive ? "show" : "hide"} `}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Whale4trade</strong>
            <small>Just now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">Copied</div>
        </div>
      </div>
      {/* <span className="icon " onClick={() => copy()}>
        <FontAwesomeIcon icon={faCopy} />
        Copy
      </span> */}
    </div>
  );
};

export default URL;
