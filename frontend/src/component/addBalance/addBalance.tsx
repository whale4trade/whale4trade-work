import axios from "axios";
import "./addBalance.css";
import { useState, useEffect } from "react";
import Choice from "./component/choice";
import env from "../../environments/enviroments";
const AddBalance = (props) => {
  // const navigate = useNavigate();

  const [price, setPrice] = useState("");
  const [errBa, setErrBa] = useState<any>("");
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
  };
  const [input, setInput] = useState({
    price: "0",
    flexRadioDefault: "w",
    number: "",
  });
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const API =
    "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TnpNM05UTXhMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuQzRTSjlxVTVrUUVvcklKYkVkcDd0bS1YSWZ2QW9EclJoU09BYXpCTk1zWGRhNlI5MHFieWdPZW02ZmN5SlFEcWhTRDRHZ3V1Tl9ISkJZSEJTUFV1Z0E=";

  // payment pay
  const payment = async () => {
    if (Number(input.price) < 9) {
      setErrBa("please check your please <=10$");
      setTimeout(() => {
        setErrBa("");
      }, 7000);
    } else {
      const data = {
        api_key: API,
      };
      try {
        await axios
          .post("https://accept.paymob.com/api/auth/tokens", data)
          .then((res) => secStep(res.data.token));
      } catch (error) {}
    }
  };

  //sect
  const secStep = (token) => {
    const data = {
      auth_token: token,
      delivery_needed: "false",
      amount_cents: `${Number(input.price) * 100}`,
      currency: "EGP",
      items: [],
    };
    try {
      axios
        .post("https://accept.paymob.com/api/ecommerce/orders", data)
        .then((res) => {
          thirdStep(res.data.id, token);
        })

        .then(() => handleClick());
    } catch (error) {
      console.log(error);
    }
  };
  //third
  const thirdStep = (id, token) => {
    if (input.flexRadioDefault === "card") {
      try {
        axios
          .post("https://accept.paymob.com/api/acceptance/payment_keys", {
            auth_token: token,
            amount_cents: `${Number(input.price) * 100}`,
            expiration: 3600,
            order_id: `${id}`,
            billing_datatokenFi: {
              apartment: "NA",
              email: `${JSON.parse(localStorage.user).email}`,
              floor: "NA",
              first_name: `${JSON.parse(localStorage.user).name}`,
              street: "NA",
              building: "NA",
              phone_number: `${JSON.parse(localStorage.user).number}`,
              shipping_method: "NA",
              postal_code: "NA",
              city: "NA",
              country: "NA",
              last_name: "NA",
              state: "NA",
            },
            currency: "EGP",
            integration_id: 3716690,
          })

          .then(
            (res) =>
              (window.location.href = `https://accept.paymob.com/api/acceptance/iframes/750171?payment_token=${res.data.token}`)
          );
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        axios
          .post("https://accept.paymob.com/api/acceptance/payment_keys", {
            auth_token: token,
            amount_cents: `${Number(input.price) * 100}`,
            expiration: 3600,
            order_id: `${id}`,
            billing_data: {
              apartment: "NA",
              email: `${JSON.parse(localStorage.user).email}`,
              floor: "NA",
              first_name: `${JSON.parse(localStorage.user).name}`,
              street: "NA",
              building: "NA",
              phone_number: `${JSON.parse(localStorage.user).number}`,
              shipping_method: "NA",
              postal_code: "NA",
              city: "NA",
              country: "NA",
              last_name: "NA",
              state: "NA",
            },
            currency: "EGP",
            integration_id: 3716756,
          })
          .then((res) => {
            axios
              .post("https://accept.paymob.com/api/acceptance/payments/pay", {
                source: {
                  identifier: input.number,
                  subtype: "WALLET",
                },
                payment_token: res.data.token, // token obtained in step 3
              })

              .then((res) => (window.location.href = res.data.redirect_url));
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // price.map((d: any): any => console.log(d));
  useEffect(() => {
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
        {errBa}
        <div className="mb-3 row fal">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            your get balance:
          </label>
          <div className="col-sm-10">
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
        <div className="choice">
          <Choice handelChange={handelChange} />
          <>
            {input.flexRadioDefault === "vodafone" ? (
              <input
                type="phone"
                onChange={handelChange}
                name="number"
                placeholder="enter your number"
                className="phone"
              />
            ) : null}
          </>
        </div>
        <div
          className={`btn btn-primary balance ${isActive ? "active" : ""}`}
          onClick={payment}
        >
          Add Balance
          <div className="spinner-border text-light " role="status"></div>
        </div>
      </div>
    </>
  );
};

export default AddBalance;
