import env from "../../../../../environments/enviroments";
import axios from "axios";
import { useState } from "react";
const DeleteBundle = (props) => {
  const [err, setErr] = useState<any>("");

  const DeleteBundle = async () => {
    try {
      await axios
        .delete(`${env.url}/bundle/${props.b.id}`)
        .then(() => window.location.reload());
    } catch (error) {
      setErr("someone bought this bundle");
      setTimeout(() => {
        setErr("");
      }, 50000);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target={`#DeleteBundle${props.b.id}`}
      >
        Delete
      </button>

      <div
        className="modal fade"
        id={`DeleteBundle${props.b.id}`}
        aria-labelledby={`exampleModal`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Whale4trade
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              are you sure for delete bundle name : {props.b.name}
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
                className="btn btn-danger"
                onClick={DeleteBundle}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteBundle;
