import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import env from "../../../environments/enviroments";

const URL = (props) => {
  const text = `${env.aff}/register/aff${JSON.parse(localStorage.user).id}`;
  const copy = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div className="url">
      <span>URL:</span>
      <NavLink to={`/register/aff/${JSON.parse(localStorage.user).id}`}>{`${
        env.aff
      }/register/aff/${JSON.parse(localStorage.user).id}`}</NavLink>
      <span className="icon " onClick={() => copy()}>
        <FontAwesomeIcon icon={faCopy} />
        Copy
      </span>
    </div>
  );
};

export default URL;
