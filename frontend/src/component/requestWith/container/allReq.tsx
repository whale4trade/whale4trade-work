import axios from "axios";
import env from "../../../environments/enviroments";
import { useEffect, useState } from "react";

const AllReq = (props) => {
  const [data, setData] = useState<any>("");
  const allReq = async () => {
    axios
      .get(`${env.url}/req/user/${JSON.parse(localStorage.user).id}`)
      .then((res) => {
        setData(res.data.data);
      });
  };
  useEffect(() => {
    allReq();
  }, []);
  console.log(data);

  return <></>;
};

export default AllReq;
