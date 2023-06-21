import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import { useState, useEffect } from "react";

import axios from "axios";
import env from "../../environments/enviroments";
import resume from "./whale4trade.com.pdf";
const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    sent: "",
    username: "",
    number: "",
    password: "",
    fileIdFront: "",
    fileIdBack: "",
    balance: "",
    imgProfile: "",
    statusAccess: "",
    conditions: "",
  });
  const [err, setErr] = useState<any>(false);
  const [file, setFile] = useState<any>(null);

  const [code, setCode] = useState<any>("");
  const [send, setSend] = useState<any>("");
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setCode(Math.floor(Math.random() * 999999));
  }, []);
  const [confirm, setConfirm] = useState<any>("");
  const errorFunction = (req) => {
    setErr(`check your ${req} `);
    setTimeout(() => {
      setErr("");
    }, 6000);
  };
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const ifEmpty = () => {
    if (input.email !== "") {
      if (input.sent) {
        if (input.username !== "") {
          if (input.number !== "") {
            if (input.password !== "") {
              if (input.fileIdFront !== "") {
                if (input.fileIdBack !== "") {
                  if (input.conditions) {
                    if (Number(code) === Number(input.sent)) {
                      const confirm = () => setConfirm((current) => !current);

                      confirm();
                      shareEmail();

                      setTimeout(() => {
                        setConfirm("");
                      }, 4000);
                    } else {
                      setErr("wrong");
                      setTimeout(() => {
                        setErr("");
                      }, 3000);
                    }
                  } else {
                    errorFunction("agreement");
                  }
                } else {
                  errorFunction("your Id back");
                }
              } else {
                errorFunction("your Id front");
              }
            } else {
              errorFunction("password");
            }
          } else {
            errorFunction("number");
          }
        } else {
          errorFunction("username");
        }
      } else {
        errorFunction("verification code in your email");
      }
    } else {
      errorFunction("email");
    }
  };

  const shareEmail = async () => {
    try {
      await axios
        .post(`${env.url}/users/share`, { email: input.email })
        .then((res) => {
          setErr(`${res.data.message}`);
          setTimeout(() => {
            setErr("");
          }, 6000);
        });
    } catch (error) {
      uploadImgFront();
      uploadImgBack();
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImgFront = () => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(`${env.ver}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        input.fileIdFront = res.data;
      });
  };
  const uploadImgBack = () => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(`${env.ver}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        input.fileIdBack = res.data;
      })
      .then(() => {
        uploadImgFront();
      })
      .then(() => addUser());
  };
  const addUser = () => {
    try {
      axios
        .post(`${env.url}/users`, {
          username: `${input.username}`,
          email: `${input.email}`,
          number: `${input.number}`,
          password: `${input.password}`,
          imgprofile: ``,
          balance: ``,
          idNF: `${input.fileIdFront}`,
          idNB: `${input.fileIdBack}`,
          statusAccess: ``,
          win: "",
        })

        .then(() => {
          setIsActive((current) => !current);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        });
    } catch (error) {}
  };

  const ver = async (email) => {
    try {
      await axios
        .post(`${env.ver}/ver`, {
          email: email,
          number: code,
        })
        .then((res) => {
          const send = () => setSend((current) => !current);
          send();
          setTimeout(() => {
            setSend("");
          }, 4000);
        });
    } catch (error) {}
  };
  const con = () => {
    if (Number(code) === Number(input.sent)) {
      const confirm = () => setConfirm((current) => !current);

      confirm();
      setTimeout(() => {
        setConfirm("");
      }, 4000);
    } else {
      setErr("wrong");
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };
  return (
    <div className="Register ">
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
            <small>just now </small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">Sent to email please check</div>
        </div>
      </div>
      <>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
            className={`toast fade ${confirm ? "show" : "hide"} `}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Whale4trade</strong>
              <small>just now </small>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">done</div>
          </div>
        </div>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
            className={`toast fade  `}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            {/* ${isActive ? "show" : "hide"} */}
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
            <div className="toast-body">Now , you whale ....</div>
          </div>
        </div>
        <div className="back"></div>
        <div className="login-box">
          <h2>Register</h2>
          <form method="POST">
            <div className="user-box">
              <input
                type="text"
                onChange={handelChange}
                name="email"
                required
              />
              <label>email</label>
            </div>
            <div className="conf">
              <input
                type="button"
                value="send"
                onClick={() => ver(input.email)}
                className="btn btn-primary"
              />
              <input
                type="number"
                placeholder="your code"
                name="sent"
                onChange={handelChange}
                className="input-number"
              />
              <input
                type="button"
                value="confirm"
                onClick={con}
                className="btn btn-primary"
              />
            </div>
            <div className="user-box">
              <input
                type="text"
                onChange={handelChange}
                name="username"
                required
              />
              <label>username</label>
            </div>
            <div className="user-box">
              <input
                type="phone"
                onChange={handelChange}
                name="number"
                required
              />
              <label>number</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                onChange={handelChange}
                name="password"
                required
              />
              <label>password</label>
            </div>
            <div className="user-box">
              <div className="id">your ID front</div>

              <input
                type="file"
                name="fileIdFront"
                onChange={(e) => {
                  handleFileChange(e);
                  input.fileIdFront = e.target.value;
                }}
                required
              />
            </div>
            <div className="user-box">
              <div className="id">your ID back</div>

              <input
                type="file"
                name="fileIdBack"
                onChange={(e) => {
                  handleFileChange(e);
                  input.fileIdBack = e.target.value;
                }}
                required
              />
            </div>
            <div>
              <input
                type="checkbox"
                name="conditions"
                onChange={handelChange}
                id="con"
              />
              <label htmlFor="con" className="label-check">
                i confirm that i am 18 years old or older and accept
                <Link to={resume} target="_blank" rel="noreferrer">
                  service agreement
                </Link>
              </label>
            </div>
            <Link to="#" type="submit" onClick={ifEmpty}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </Link>

            <div className="err">{err}</div>
            <Link to="/login">
              <span></span>
              <span></span>
              <span></span>
              <span></span>You have account Already
            </Link>
          </form>
        </div>
      </>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className={`toast fade ${isActive ? "show" : "hide"} `}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Whale4trade</strong>
            <small>just now </small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">please login</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
