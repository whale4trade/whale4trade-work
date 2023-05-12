/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import env from "../../environments/enviroments";
import "./order.style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Order = (props) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const checkUser = () => {
    if (JSON.parse(localStorage.user) === null) {
      window.location.pathname = "/login";
    }
  };
  // useEffect(() => {
  checkUser();
  // }, []);
  const [dataBundle, setDataBundle] = useState<any>([]);
  const handleBundle = async () => {
    try {
      await axios
        .get(`${env.url}/bundle/${window.location.search.slice(1)}`)
        .then((res) => setDataBundle(res.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    handleBundle();
  }, []);
  const [users, setUser] = useState<any>([]);
  const handleUser = async () => {
    try {
      await axios
        .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
        .then((res) => setUser(res.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    handleUser();
  }, []);
  const dataCreate = {
    userId: JSON.parse(localStorage.user).id,
    bundleId: window.location.search.slice(1),
    price: dataBundle.win,
    timeBuy: new Date(),
    win: dataBundle.price,
    name: dataBundle.name,
  };

  const handleOrder = async () => {
    try {
      if (Number(users.balance) >= Number(dataBundle.price)) {
        try {
          await axios.post(`${env.url}/order`, dataCreate).then(async () => {
            try {
              await axios
                .patch(
                  `${env.url}/users/balance/${
                    JSON.parse(localStorage.user).id
                  }`,
                  {
                    id: JSON.parse(localStorage.user).id,
                    balance: Number(users.balance) - Number(dataBundle.price),
                  }
                )
                .then(async () => {
                  try {
                    await axios
                      .get(
                        `${env.url}/users/${JSON.parse(localStorage.user).id}`
                      )
                      .then((res) =>
                        localStorage.setItem(
                          "user",
                          JSON.stringify(res.data.data)
                        )
                      );
                  } catch (error) {}
                })
                .then(async () => {
                  try {
                    await axios.patch(`${env.url}/tree/bundle/${users.email}`, {
                      bundle: `${dataBundle.name}`,
                      iamemail: `${users.email}`,
                    });
                  } catch (error) {}
                })

                .then(async () => {
                  try {
                    await axios
                      .post(`${env.url}/transaction/`, {
                        userId: JSON.parse(localStorage.user).id,
                        category: `subscribe to bundle ${dataBundle.name}`,
                        price: `${dataBundle.price}`,
                        timeJoin: new Date(),
                      })
                      .then(() => setIsActive((current) => !current))
                      .then(() =>
                        setTimeout(() => {
                          navigate("/profile");
                        }, 3000)
                      );
                  } catch (error) {}
                });
            } catch (error) {}
          });
        } catch (error) {}
      } else {
        navigate("/addBalance");
      }
    } catch (error) {}
  };

  return (
    <div className="container-order">
      <div className="back"></div>
      <div>
        <img
          src={`${env.ver}/image/${dataBundle.imgbundle}`}
          alt=""
          className="rounded"
        />
        <div className="con">
          <div className="price">
            <span className="title">price: </span>
            <span className="co">{`${dataBundle.price}$`}</span>
          </div>
          <div className="win">
            <span className="title">win: </span>
            <span className="co">{`${dataBundle.win}$`}</span>
          </div>
          <div className="name">
            <span className="title">name: </span>
            <span className="co">{dataBundle.name}</span>
          </div>
          <div className="category">
            <span className="title">category: </span>
            <span className="co">{dataBundle.category}</span>
          </div>
          <input
            type="button"
            className="btn btn-primary"
            value="order"
            onClick={handleOrder}
            id="liveToastBtn"
          />
          <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div
              id="liveToast"
              className={`toast fade ${isActive ? "show" : "hide"} `}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header">
                <strong className="me-auto">Whale4trade</strong>
                <small>11 mins ago</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
              <div className="toast-body">Done, your bought it</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
