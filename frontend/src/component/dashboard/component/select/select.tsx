import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faB,
  faDollarSign,
  faR,
  faPhone,
  faA,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
const Select = () => {
  const reload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  return (
    <>
      <NavLink className="select-user" to="">
        <FontAwesomeIcon
          onClick={reload}
          className="select-user "
          icon={faUsers}
        />
        <span className="title-s">Users</span>
      </NavLink>
      <NavLink className="select-bundle" to="bundle">
        <FontAwesomeIcon
          onClick={reload}
          className="select-bundle"
          icon={faB}
        />
        <span className="title-s">Bundle</span>
      </NavLink>
      <NavLink className="select-server" to="req">
        <FontAwesomeIcon onClick={reload} icon={faR} />
        <span className="title-s">req</span>
      </NavLink>
      <NavLink className="select-server" to="phones">
        <FontAwesomeIcon onClick={reload} icon={faPhone} />
        <span className="title-s">phones</span>
      </NavLink>
      <NavLink className="select-server" to="dollar">
        <FontAwesomeIcon
          onClick={reload}
          className="select-server"
          icon={faDollarSign}
        />
        <span className="title-s">dollar</span>
      </NavLink>

      <NavLink className="select-server" to="api">
        <FontAwesomeIcon onClick={reload} icon={faA} />
        <span className="title-s">api</span>
      </NavLink>
    </>
  );
};

export default Select;
