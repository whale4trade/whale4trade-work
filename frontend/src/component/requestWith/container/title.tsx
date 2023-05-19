import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";
const TitleReq = (props) => {
  const [input, setInput] = useState({
    price: "",
  });
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addReq = async () => {
    try {
      axios
        .post(`${env.url}/req`, {
          userId: JSON.parse(localStorage.user).id,
          price: input.price,
          timeReq: Date.now(),
          status: "pending",
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
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
            </div>
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
                className="btn btn-primary"
                onClick={addReq}
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
