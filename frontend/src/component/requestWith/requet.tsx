import ConfirmUser from "../confirmUser";

import "./style/requset.css";
import TitleReq from "./container/title";
import AllReq from "./container/allReq";
const ReqWith = () => {
  ConfirmUser();

  return (
    <>
      <div className="back"></div>
      <div className="request container">
        <TitleReq />
        <AllReq />
      </div>
    </>
  );
};

export default ReqWith;
