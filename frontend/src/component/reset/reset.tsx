import { useState } from "react";
import axios from "axios";
import env from "../../environments/enviroments";
import { useNavigate, Link } from "react-router-dom";
import "./reset.css";

const Reset = () => {
  const [input, setInput] = useState({
    email: "",
  });
  const [err, setErr] = useState<any>("");
  const navigate = useNavigate();

  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const search = async () => {
    try {
      await axios
        .get(`${env.url}/users/email/${input.email}`)
        .then((res) =>
          res.data.data === undefined
            ? setErr("not found please confirm your email")
            : navigate(`/reset/auth/${input.email}/`)
        );
    } catch (error) {}
  };
  console.log();

  return (
    <>
      <div className="back"></div>
      <div className="reset container">
        {/* <input type="email" /> */}
        <div className="input-group input-group-sm mb-3">
          <input
            type="button"
            className="btn btn-primary"
            placeholder="Search your email"
            value="Search"
            onClick={search}
          />

          <input
            name="email"
            onChange={handelChange}
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div>{err}</div>
      </div>
    </>
  );
};

export default Reset;
