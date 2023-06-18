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
  const [input, setInput] = useState({
    reqSearch: "",
  });
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [clear, setClear] = useState(false);
  const hideDoneAndCancel = () => {
    setClear((current) => !current);
  };
  console.log(clear);

  const getReq = async () => {
    try {
      await axios.get(`${env.url}/req`).then((res) => {
        setGetAllReq(res.data.data);
      });
    } catch (error) {}
  };
  useEffect(() => {
    getReq();
  }, []);

  return (
    <>
      <div className="request">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            onChange={handelChange}
            name="reqSearch"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <input
          type="button"
          value={`${clear ? "visible" : "hide"}`}
          onClick={hideDoneAndCancel}
          className="clear btn btn-primary"
        />
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
              .filter((r) => {
                return input.reqSearch === ""
                  ? r
                  : r.useremail.toLowerCase().includes(input.reqSearch);
              })
              .map((r, u): any => (
                <>
                  <tr
                    className={`${r.status} ${clear}`}
                    data-bs-toggle="modal"
                    data-bs-target={`#model${r.id}`}
                    key={u}
                  >
                    <td>{++u}</td>
                    <td>{r.useremail}</td>
                    <td>{r.price}$</td>
                    <td>{r.phone}</td>
                    <td>
                      {new Date(Number(r.timereq)).toLocaleString("en-AU")}
                    </td>
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
