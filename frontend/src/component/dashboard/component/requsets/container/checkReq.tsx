import axios from "axios";
import env from "../../../../../environments/enviroments";
import { useEffect, useState } from "react";
const CheckReq = () => {
  const [allReq, setAllReq] = useState([]);
  const getAllReq = async () => {
    try {
      await axios
        .get(`${env.url}/req/user/${JSON.parse(localStorage.user).id}`)
        .then((res) => {
          setAllReq(res.data.data);
        });
    } catch (error) {}
  };
  allReq.map((r: any) => (r.status === "done" ? console.log(r.price) : ""));
  useEffect(() => {
    getAllReq();
  }, []);
  return <></>;
};

export default CheckReq;
