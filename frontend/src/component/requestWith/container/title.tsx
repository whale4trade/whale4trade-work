import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";
const TitleReq = (props) => {
  const [input, setInput] = useState({
    price: "",
    phone: "",
  });
  const [err, setErr] = useState("");
  const errorHandel = (text) => {
    setErr(text);
    setTimeout(() => {
      setErr("");
    }, 5000);
  };
  const [isActive, setIsActive] = useState("");

  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsActive("");
  };

  const getBalance = async () => {
    try {
      await axios
        .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
        .then((res) => {
          if (Number(input.price) <= Number(res.data.data.balance)) {
            if (Number(input.price) > 0) {
              if (input.phone.length !== 0) {
                if (input.phone.length > 10) {
                  setIsActive("dis");
                  addReq();
                } else {
                  errorHandel("add number like 01234567****");
                }
              } else {
                errorHandel("please add phone for withdraw");
              }
            } else {
              errorHandel(`should add number up to 0 `);
            }
          } else {
            errorHandel(`your balance = ${Number(res.data.data.balance)}$ `);
          }
        });
    } catch (error) {}
  };
  const addReq = async () => {
    setIsActive("dis");

    try {
      await axios
        .post(`${env.url}/req`, {
          userId: JSON.parse(localStorage.user).id,
          userEmail: JSON.parse(localStorage.user).email,
          price: input.price,
          timeReq: Date.now(),
          status: "pending",
          phone: input.phone,
        })
        .then(() => {
          setIsActive("dis");

          try {
            axios
              .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
              .then((res) => {
                setIsActive("dis");

                try {
                  axios
                    .patch(
                      `${env.url}/users/balance/${
                        JSON.parse(localStorage.user).id
                      }`,
                      {
                        balance:
                          Number(res.data.data.balance) - Number(input.price),
                        id: JSON.parse(localStorage.user).id,
                      }
                    )
                    .then((res) => {
                      window.location.reload();
                    });
                } catch (error) {}
              });
          } catch (error) {}
        });
    } catch (error) {}
  };

  return (
    <div className="title">
      <div className="req-title">Requests</div>

      <FontAwesomeIcon
        icon={faPlus}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addReq"
      />
      <div
        className="modal fade"
        id="addReq"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                whale4trade
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <span className="input-group-text">price for withdraw </span>
                <input
                  type="number"
                  onChange={handelChange}
                  name="price"
                  aria-label="First name"
                  className="form-control"
                />
                <span className="input-group-text">$</span>
              </div>
              <div className="input-group">
                <span className="input-group-text">your number </span>
                <input
                  type="number"
                  onChange={handelChange}
                  name="phone"
                  aria-label="First name"
                  className="form-control"
                />
              </div>
            </div>
            <div className="err">{err}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-primary ${isActive}`}
                onClick={getBalance}
              >
                add request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleReq;
