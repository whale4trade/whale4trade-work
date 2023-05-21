import React, { useState } from "react";
import { useEffect } from "react";
import env from "../../../../../environments/enviroments";
import axios from "axios";

const TransactionDash = (props) => {
  const [transaction, setTransaction] = useState([]);
  const getTransaction = async () => {
    try {
      await axios
        .get(`${env.url}/transaction/user/${props.t.id}`)
        .then((res) => setTransaction(res.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    getTransaction();
  });
  return (
    <>
      <div className="trans">
        <h2 className="title-info">transaction</h2>
        {transaction.map((t: any): any => (
          <div className="con-ti">
            <div>{t.category}</div>
            <div>price: {t.price}</div>
            <div>time buy: {new Date(t.timejoin).toDateString()}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionDash;
