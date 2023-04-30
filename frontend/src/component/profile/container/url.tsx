import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const URL = (props) => {
  const text = `https://shimmering-phoenix-977e7f.netlify.app/register/aff${
    JSON.parse(localStorage.user).id
  }`;
  const copy = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div className="url">
      <span>URL:</span>
      <NavLink
        to={`/register/aff/${JSON.parse(localStorage.user).id}`}
      >{`https://shimmering-phoenix-977e7f.netlify.app/register/aff/${
        JSON.parse(localStorage.user).id
      }`}</NavLink>
      <span className="icon " onClick={() => copy()}>
        <FontAwesomeIcon icon={faCopy} />
        Copy
      </span>
    </div>
  );
};

export default URL;
