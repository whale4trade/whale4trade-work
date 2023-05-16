import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../../environments/enviroments";
const Do = () => {
  const [dollar, setDollar] = useState<any>("");
  const [input, setInput] = useState({
    dollar: "",
  });
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const doll = async () => {
    try {
      await axios.get(`${env.url}/dol`).then((res) => setDollar(res.data.data));
    } catch (error) {}
  };
  const updateDollar = async () => {
    try {
      await axios
        .patch(`${env.url}/dol/${dollar.id}`, {
          id: dollar.id,
          dollar: input.dollar,
        })
        .then((res) => window.location.reload());
    } catch (error) {}
  };
  useEffect(() => {
    doll();
  }, []);
  return (
    <>
      <input
        type="button"
        className="btn btn-primary dollar-co"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalDollar"
        value={`
        
        dollar:${dollar.dollar}$
        `}
      />
      <div
        className="modal fade"
        id="exampleModalDollar"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <span>Dollar: </span>
              <input type="number" name="dollar" onChange={handelChange} />
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
                onClick={updateDollar}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Do;
