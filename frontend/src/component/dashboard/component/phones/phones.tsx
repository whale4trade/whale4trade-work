import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./phones.css";
import { useEffect, useState } from "react";
import env from "../../../../environments/enviroments";
import axios from "axios";
import EditPhones from "./component/edit";
import AddPhones from "./component/addNum";
const Phones = () => {
  const [phone, setPhone] = useState<any>({});
  const allPhones = async () => {
    try {
      await axios.get(`${env.url}/phones`).then((res) => {
        setPhone(res.data.data);
      });
    } catch (error) {}
  };
  useEffect(() => {
    allPhones();
  });
  return (
    <>
      <div className="container Phones">
        <div className="title">
          <h1>Phones</h1>
          <FontAwesomeIcon
            icon={faPlus}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropAddPhones"
          />
          <AddPhones />
        </div>
        <div className="con-phones">
          {" "}
          {Object.values(phone).map((ph: any, i) => (
            <>
              <div
                className="con-phone"
                data-bs-toggle="modal"
                data-bs-target={`#staticBackdrop${ph.id}`}
                key={i}
              >
                <span>phone{++i}: </span>
                <span className="num">0{ph.phonenumber}</span>
              </div>
              <EditPhones ph={ph} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Phones;
