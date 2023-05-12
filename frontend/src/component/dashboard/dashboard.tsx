import { Routes, Route, Navigate } from "react-router-dom";
import "./dashboard.css";
import Select from "./component/select/select";
import Users from "./component/user/users";
import Bundle from "./component/bundle/bundle";
import { useNavigate } from "react-router-dom";

import env from "../../environments/enviroments";
import axios from "axios";
import { useEffect } from "react";
const Dashboard = () => {
  const navigate = useNavigate();

  const check = async () => {
    try {
      await axios
        .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
        .then((res) => {
          if (res.data.data.statusaccess === "user") {
            navigate("/");
          }
        });
    } catch (error) {}
  };
  useEffect(() => {
    check();
  }, []);
  return (
    <>
      <div className="dashboard">
        <div className="idk">
          <Select />
        </div>
        <div className="con">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/bundle" element={<Bundle />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
