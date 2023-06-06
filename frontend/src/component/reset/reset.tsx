import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../environments/enviroments";
import { useNavigate, Link } from "react-router-dom";
import "./reset.css";

const Reset = () => {
  const [input, setInput] = useState({
    email: "",
    sent: "",
  });
  const [err, setErr] = useState<any>("");
  const navigate = useNavigate();
  const [code, setCode] = useState<any>("");
  const [send, setSend] = useState<any>("");
  useEffect(() => {
    setCode(Math.floor(Math.random() * 999999));
  }, []);
  const ver = async (email) => {
    if (input.email !== "") {
      try {
        await axios
          .post(`${env.ver}/ver`, {
            email: email,
            number: code,
          })
          .then((res) => {
            setSend((current) => !current);
            setTimeout(() => {
              setSend("");
            }, 4000);
          });
      } catch (error) {}
    } else {
      setErr("please check your email");
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };
  const con = () => {
    Number(code) === Number(input.sent)
      ? (window.location.pathname = `/reset/auth/${input.email}/`)
      : setErr(" your code is wrong");
    setTimeout(() => {
      setErr("");
    }, 3000);
  };
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const search = async () => {
    try {
      await axios.get(`${env.url}/users/email/${input.email}`).then(
        (res) => {
          if (res.data.data === undefined) {
            setErr("not found please confirm your email");
            setTimeout(() => {
              setErr("");
            }, 3000);
          } else {
            ver(input.email);
          }
        }
        // :
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="back"></div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className={`toast fade ${send ? "show" : "hide"} `}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Whale4trade</strong>
            <small>Just now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">check your email, sent</div>
        </div>
      </div>
      <div className="back"></div>
      <div className="login-box">
        <h2>Reset Password</h2>
        <form method="POST">
          <div className="user-box">
            <input type="text" name="email" required onChange={handelChange} />
            <label>Email</label>
          </div>
          {/* <input
            type="button"
            value=""
            className="btn btn-dark"
            onClick={}
          /> */}
          <Link to="" onClick={() => search()} className="send-res">
            <span></span>
            <span></span>
            <span></span>
            <span></span>send code
          </Link>
          <div></div>
          <div className="user-box">
            <input type="number" name="sent" required onChange={handelChange} />
            <label>your code</label>
          </div>
          <div className="err">{err && err}</div>

          <Link to="" onClick={con}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>Search Your Email
          </Link>
        </form>
      </div>
    </>
  );
};

export default Reset;
