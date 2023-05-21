import { Routes, Route, Navigate } from "react-router-dom";
import "./dashboard.css";
import Select from "./component/select/select";
import Users from "./component/user/users";
import Bundle from "./component/bundle/bundle";

import Do from "./component/dollar/do";
import ConfirmUser from "../confirmUser";
import RequestsDash from "./component/requsets/requestsDash";
const Dashboard = () => {
  ConfirmUser();
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
            <Route path="/dollar" element={<Do />} />
            <Route path="/req" element={<RequestsDash />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
