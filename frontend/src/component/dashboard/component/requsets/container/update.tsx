import { useState } from "react";
import axios from "axios";
import env from "../../../../../environments/enviroments";
const UpdateReq = (props) => {
  const [input, setInput] = useState({
    status: "",
  });
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const update = async (id) => {
    try {
      await axios
        .patch(`${env.url}/req/${props.r.id}`, {
          id: id,
          status: input.status,
        })
        .then(() => {
          if (input.status === "done") {
            try {
              axios
                .get(`${env.url}/users/${props.r.userid}`)
                .then((res) => {
                  try {
                    axios.post(`${env.url}/transaction/`, {
                      userId: props.r.userid,
                      category: ` done your request withdraw ${props.r.price}$`,
                      price: `${props.r.price}`,
                      timeJoin: new Date(),
                    });
                  } catch (error) {
                    console.log(error);
                  }
                })
                .then(() => {
                  window.location.reload();
                });
            } catch (error) {
              console.log(error);
            }
          } else if (input.status === "cancel") {
            try {
              axios.get(`${env.url}/users/${props.r.userid}`).then((res) => {
                console.log(Number(res.data.data.balance));
                console.log(Number(props.r.price));
                console.log(
                  Number(props.r.price) + Number(res.data.data.balance)
                );

                try {
                  axios
                    .patch(`${env.url}/users/balance/${props.r.userid}`, {
                      balance:
                        Number(res.data.data.balance) + Number(props.r.price),
                      id: props.r.userid,
                    })
                    .then(() => {
                      try {
                        axios
                          .post(`${env.url}/transaction/`, {
                            userId: props.r.userid,
                            category: `cancel your  request withdraw ${props.r.price}$`,
                            price: `${props.r.price}`,
                            timeJoin: new Date(),
                          })
                          .then(() => {
                            window.location.reload();
                          });
                      } catch (error) {
                        console.log(error);
                      }
                    });
                } catch (error) {
                  console.log(error);
                }
              });
            } catch (error) {
              console.log(error);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id={`model${props.r.id}`}
        aria-labelledby="exampleModalLabel"
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
              <div>
                <span>useremail: </span>
                <span>{props.r.useremail}</span>
              </div>
              <div>
                <span>price: </span>
                <span>{props.r.price}$</span>
              </div>
              <div>
                <span>Date: </span>
                <span>
                  {new Date(Number(props.r.timereq)).toLocaleString()}
                </span>
              </div>
              <select
                onChange={handelChange}
                className="form-select"
                name="status"
                aria-label="Default select example"
              >
                <option value="pending">pending</option>
                <option value="done">done</option>
                <option value="cancel">cancel</option>
              </select>
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
                onClick={() => update(props.r.id)}
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

export default UpdateReq;
