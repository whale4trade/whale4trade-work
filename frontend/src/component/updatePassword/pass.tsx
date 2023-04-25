import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../environments/enviroments";
import { useNavigate, Link } from "react-router-dom";

const UpdatePass = () => {
  const navigate = useNavigate();

  const email = window.location.href.slice(33, -1);

  const [input, setInput] = useState({
    password: "",
  });
  const [id, setId] = useState<any>("");
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
    try {
      await axios
        .patch(`${env.url}/users/pass/${id.id}`, {
          id: id.id,
          password: input.password,
        })
        .then(() => {
          navigate("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <input type="email" value={email} disabled />
      <input type="password" name="password" onChange={handelChange} />
      <input
        type="button"
        value="reset"
        className="btn btn-primary"
        onClick={update}
      />
    </>
  );
};

export default UpdatePass;
