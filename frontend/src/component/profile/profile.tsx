import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";
import env from "../../environments/enviroments";
import axios from "axios";

import "./profile.css";

import UserProfile from "./container/user";
import TreeProfile from "./container/tree";
import Transaction from "./container/transaction";
import URL from "./container/url";
import Bundle from "./container/bundle";
import ConfirmUser from "../confirmUser";
const Profile = (props: any) => {
  ConfirmUser();
  const [dataBundle, setDataBundle] = useState<any[]>([]);
  useEffect(() => {
    try {
      axios
        .get(`${env.url}/order/user/${JSON.parse(localStorage.user).id}`)
        .then((res: any) => setDataBundle(res.data.data));
    } catch (error) {}
  }, [setDataBundle]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage: any = 1;
  const lastIndex: any = currentPage * recordsPerPage;
  const firstIndex: any = lastIndex - recordsPerPage;
  const records: any = dataBundle.slice(firstIndex, lastIndex);
  const npage: any = Math.ceil(dataBundle.length / recordsPerPage);
  const numbers: any = [...Array(npage + 1).keys()].slice(1);

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  return (
    <>
      <div className="back"></div>
      <div className=" container profile ">
        <UserProfile />

        <div className="bundle">
          <div className="title">Bundle</div>
          {records.map((bundle) => {
            return (
              <Bundle
                bundleInfo={bundle}
                changeCPage={changeCPage}
                currentPage={currentPage}
                key={bundle.id}
                numbers={numbers}
              />
            );
          })}
        </div>
        <Transaction />
        <TreeProfile />
        <URL />
      </div>
    </>
  );
};

export default Profile;
/* Replace with your SQL commands */
