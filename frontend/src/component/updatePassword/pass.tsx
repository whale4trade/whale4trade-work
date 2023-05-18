import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../environments/enviroments";
import { useNavigate, Link } from "react-router-dom";

const UpdatePass = () => {
  const navigate = useNavigate();

  const email = window.location.pathname.slice(12, -1);

  const [input, setInput] = useState({
    password: "",
  });
  const [id, setId] = useState<any>("");
  const [err, setErr] = useState<any>("");
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const getUser = async () => {
    try {
      await axios
        .get(`${env.url}/users/email/${email}`)
        .then((res) => setId(res.data.data));
    } catch (error) {}
  };

  const update = async () => {
    if (input.password !== "") {
      try {
        await axios
          .patch(`${env.url}/users/pass/${id.id}`, {
            id: id.id,
            password: input.password,
          })
          .then(() => {
            navigate("/login");
          });
      } catch (error) {}
    } else {
      setErr("please check your password");
      setTimeout(() => {
        setErr("");
      }, 4000);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="back"></div>
      <div className="login-box">
        <h2>Reset Password</h2>
        <form method="POST">
          <div className="user-box">
            <input
              type="text"
              name="email"
              value={email}
              onChange={handelChange}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              required
              onChange={handelChange}
            />
            <label>Password</label>
          </div>
          <div className="err">{err}</div>
          <Link to="#" type="submit" onClick={update}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            reset
          </Link>
        </form>
      </div>
    </>
  );
};

export default UpdatePass;
