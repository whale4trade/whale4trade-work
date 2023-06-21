import { useState } from "react";
import axios from "axios";
import env from "../../../../../environments/enviroments";
const AddPhones = (props) => {
  const [input, setInput] = useState({
    phones: "",
  });
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addPhones = async () => {
    if (input.phones !== "") {
      try {
        await axios
          .post(`${env.url}/phones`, {
            phonenumber: input.phones,
          })
          .then(() => window.location.reload());
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdropAddPhones"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
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
              <label htmlFor="addPh">add number</label>
              <input
                type="number"
                id="addPh"
                name="phones"
                onChange={handelChange}
              />
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
                onClick={addPhones}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPhones;
