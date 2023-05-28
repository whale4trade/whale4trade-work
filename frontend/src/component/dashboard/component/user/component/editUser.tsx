import { useState } from "react";
import axios from "axios";
import env from "../../../../../environments/enviroments";

const EditUser = (props) => {
  const [input, setInput] = useState({
    email: "",
    username: "",
    number: "",
    imgprofile: "",
    bundleName: "",
    bundleId: "",
    balance: "",
    statusAccess: "",
    id: "",
  });
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const EditUser = (id) => {
    try {
      axios
        .patch(`${env.url}/users/${id}`, {
          email: input.email === "" ? props.u.email : input.email,

          username: input.username === "" ? props.u.username : input.username,

          number: input.number === "" ? props.u.number : input.number,

          imgprofile: props.u.imgprofile,

          bundleName: props.u.bundleName,

          bundleId: props.u.bundleId,
          statusAccess:
            input.statusAccess === ""
              ? props.u.statusaccess
              : input.statusAccess,

          id: props.u.id,
        })
        .then((res) => {
          if (input.balance !== "") {
            updateBalance(props.u.id, input.balance);
          }
        })
        .then((res) => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    } catch (error) {}
  };

  const updateBalance = (id, bala) => {
    try {
      axios.patch(`${env.url}/users/balance/${id}`, {
        id: id,
        balance: bala,
      });
    } catch (error) {}
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target={`#staticBackdropEdit${props.u.id}`}
      >
        Edit
      </button>
      <div
        className="modal fade"
        id={`staticBackdropEdit${props.u.id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                update User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                onChange={handelChange}
                name="email"
                placeholder="email"
              />
              <input
                type="text"
                onChange={handelChange}
                name="username"
                placeholder="username"
              />
              <input
                type="text"
                onChange={handelChange}
                name="number"
                placeholder="number"
              />
              <input
                type="number"
                onChange={handelChange}
                name="balance"
                placeholder="balance"
              />
              <div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="statusAccess"
                  onChange={handelChange}
                >
                  <option value="sel">select status</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
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
                onClick={() => EditUser(props.u.id)}
                type="button"
                className="btn btn-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
