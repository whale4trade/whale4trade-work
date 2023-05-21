import axios from "axios";
import env from "../../../../../environments/enviroments";
import React, { useState, useEffect } from "react";

const BundleUserReq = (props) => {
  const [order, setOrder] = useState([]);

  const getOrders = async () => {
    try {
      await axios
        .get(`${env.url}/order/user/${props.o.id}`)
        .then((res) => setOrder(res.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <div className="bundle">
        <h2 className="h2">bundle</h2>
        {order.map((o: any): any => (
          <div className="con-ti">
            <div>name: {o.name}</div>
            <div>price: {o.price}$</div>
            <div>time buy: {new Date(Number(o.timebuy)).toDateString()}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BundleUserReq;
