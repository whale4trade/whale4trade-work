import axios from "axios";
import "./addBalance.css";
import { useState, useEffect } from "react";
import env from "../../environments/enviroments";
const AddBalance = (props) => {
  // const navigate = useNavigate();

  const [price, setPrice] = useState("");
  const [phones, setPhones] = useState<any>("");

  const [input, setInput] = useState({
    price: "0",
  });
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    try {
      axios.get(`${env.url}/phones`).then((res) => {
        setPhones(res.data.data);
      });
    } catch (error) {}
    try {
      axios.get(`${env.url}/dol`).then((res) => setPrice(res.data.data.dollar));
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="back"></div>
      <div className="container balance">
        <div className="input-group mb-3">
          <span className="input-group-text">L.E</span>
          <input
            type="number"
            name="price"
            className="form-control"
            onChange={handelChange}
            aria-label="Amount (to the nearest dollar)"
          />
          <span className="input-group-text">.00</span>
        </div>
        <div className="input-group">
          <label htmlFor="staticEmail" className="">
            your get balance:
          </label>
          <div className="">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail"
              value={`${Number(Number(input.price) / Number(price)).toFixed(
                2
              )}$`}
            />
          </div>
        </div>
        <div className="phones">
          <div>phones for vodafone cash payment</div>
          {Object.values(phones).map((ph: any, i) => (
            <div className="con-phon" key={i}>
              <span>phone{++i}: </span>
              <span className="num">0{ph.phonenumber}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddBalance;
