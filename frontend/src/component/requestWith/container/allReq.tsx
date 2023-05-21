import axios from "axios";
import env from "../../../environments/enviroments";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const AllReq = (props) => {
  const [dataReq, setDataReq] = useState<any>([]);
  const allReq = async () => {
    axios
      .get(`${env.url}/req/user/${JSON.parse(localStorage.user).id}`)
      .then((res) => {
        setDataReq(res.data.data);
      });
  };
  useEffect(() => {
    allReq();
  }, []);
  console.log(dataReq);

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Price</th>
            <th>status</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {dataReq
            .sort((a, b) => (a.timereq > b.timereq ? -1 : 1))
            .map((r, u): any => (
              <tr className={`${r.status}`} key={u}>
                <td>{++u}</td>
                <td>{r.price}$</td>
                <td>{new Date(Number(r.timereq)).toLocaleString()}</td>
                <td>{r.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default AllReq;
