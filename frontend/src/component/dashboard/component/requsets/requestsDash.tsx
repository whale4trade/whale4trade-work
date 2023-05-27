import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../../environments/enviroments";
import Table from "react-bootstrap/Table";
// import UserInfoDashReq from "./container/user";
// import BundleUserReq from "./container/bundle";
// import TransactionDash from "./container/transacion";
import UpdateReq from "./container/update";

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

  return (
    <>
      <div className="request container">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>email</th>
              <th>Price</th>
              <th>phone</th>
              <th>date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {getAllReq
              .sort((a, b) => (a.status > b.status ? -1 : 1))
              .map((r, u): any => (
                <>
                  <tr
                    className={`${r.status}`}
                    data-bs-toggle="modal"
                    data-bs-target={`#model${r.id}`}
                    key={u}
                  >
                    <td>{++u}</td>
                    <td>{r.useremail}</td>
                    <td>{r.price}$</td>
                    <td>{r.phone}$</td>
                    <td>{new Date(Number(r.timereq)).toLocaleString()}</td>
                    <td>{r.status}</td>
                  </tr>
                  <UpdateReq r={r} />
                </>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default RequestsDash;
