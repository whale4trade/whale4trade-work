import { useState } from "react";
import axios from "axios";
import env from "../../environments/enviroments";
import { useNavigate, Link } from "react-router-dom";

const Reset = () => {
  const [input, setInput] = useState({
    email: "",
  });
  const [err, setErr] = useState<any>("");
  const navigate = useNavigate();

  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(input);
  const search = async () => {
    try {
      await axios
        .get(`${env.url}/users/email/${input.email}`)
        .then((res) =>
          res.data.data === undefined
            ? setErr("not found")
            : navigate(`/reset/auth/${input.email}/`)
        );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <input type="email" name="email" onChange={handelChange} />
      <input
        type="button"
        className="btn btn-primary"
        value="Search"
        onClick={search}
      />
      <div>{err}</div>
    </>
  );
};

export default Reset;
