import ConfirmUser from "../confirmUser";
import axios from "axios";
import env from "../../environments/enviroments";
import { useEffect } from "react";

import "./style/requset.css";
import TitleReq from "./container/title";
const ReqWith = () => {
  ConfirmUser();
  const getReq = async () => {
    try {
      axios
        .get(`${env.url}/req/user/${JSON.parse(localStorage.user).id}`)
        .then((res) => {
          console.log(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReq();
  }, []);
  return (
    <>
      <div className="back"></div>
      <div className="request container">
        <TitleReq />
      </div>
    </>
  );
};

export default ReqWith;
