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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="back"></div>

      <div className="login-box">
        <h2>Reset Password</h2>
        <form method="POST">
          <div className="user-box">
            <input type="text" name="email" onChange={handelChange} />
            <label>Email</label>
          </div>

          <div className="active">{err && err}</div>

          <Link to="" type="submit" onClick={search}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Search your email
          </Link>
        </form>
      </div>
    </>
  );
};

export default Reset;
