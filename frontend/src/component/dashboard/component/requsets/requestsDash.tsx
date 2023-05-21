import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../../environments/enviroments";
import Table from "react-bootstrap/Table";
import UserInfoDashReq from "./container/user";
import BundleUserReq from "./container/bundle";
import TransactionDash from "./container/transacion";

const RequestsDash = (props) => {
  const [getAllReq, setGetAllReq] = useState<any>([]);

  const getReq = async () => {
    try {
      await axios.get(`${env.url}/req`).then((res) => {
        setGetAllReq(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReq();
  }, []);
  const [getUser, setGetUser] = useState<any>([]);

  const getUserDetails = async (email) => {
    try {
      await axios.get(`${env.url}/users/email/${email}`).then((res) => {
        setGetUser(res.data.data);
        // console.log(res.data.data);
      });
    } catch (error) {}
  };
  return (
    <>
      <div className="request container">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>email</th>
              <th>Price</th>
              <th>status</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {getAllReq
              .sort((a, b) => (a.timereq > b.timereq ? -1 : 1))
              .map((r, u): any => (
                <>
                  <tr
                    className={`${r.status}`}
                    data-bs-toggle="modal"
                    data-bs-target={`#model${r.id}`}
                    onClick={() => getUserDetails(r.useremail)}
                    key={u}
                  >
                    <td>{++u}</td>
                    <td>{r.useremail}</td>
                    <td>{r.price}$</td>
                    <td>{new Date(Number(r.timereq)).toLocaleString()}</td>
                    <td>{r.status}</td>
                  </tr>
                  <div
                    className="modal fade"
                    id={`model${r.id}`}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
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
                          <UserInfoDashReq u={getUser} />
                          <BundleUserReq o={getUser} />
                          <TransactionDash t={getUser} />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default RequestsDash;
