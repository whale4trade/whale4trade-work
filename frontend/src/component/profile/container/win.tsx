import env from "../../../environments/enviroments";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Win = (props) => {
  const [dataWin, setDataWin] = useState<any>([]);
  const win = async () => {
    try {
      await axios
        .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
        .then((res) => setDataWin(res.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    win();
  }, []);
  // console.log(dataWin);

  return <span className="test">{`${Number(dataWin.win).toFixed(3)}$`}</span>;
};

export default Win;
