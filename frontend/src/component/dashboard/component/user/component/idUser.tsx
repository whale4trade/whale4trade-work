import { Link } from "react-router-dom";
import env from "../../../../../environments/enviroments";
const IdUser = (props) => {
  return (
    <>
      {" "}
      <div className="idnf">
        <span className="title-u">idnf: </span>
        <Link
          to={`${env.ver}/image/${props.u.idnf}`}
          target="_blank"
          className="get"
        >
          {props.u.idnf}
        </Link>
      </div>
      <div className="idnb">
        <span className="title-u">idnb: </span>
        <Link
          to={`${env.ver}/image/${props.u.idnb}`}
          target="_blank"
          className="get"
        >
          {props.u.idnb}
        </Link>
      </div>
    </>
  );
};

export default IdUser;
