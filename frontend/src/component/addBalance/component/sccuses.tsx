import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";
import queryString from "query-string";
const Success = () => {
  const priceURl = Number(window.location.search.slice(41, -804)) / 100;
  const parsed = queryString.parse(window.location.search);

  const updateBal = async (price) => {
    try {
      await axios
        .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
        .then((res) => {
          try {
            axios
              .patch(`${env.url}/users/balance/${res.data.data.id}`, {
                id: res.data.data.id,
                balance: Number(res.data.data.balance) + Number(price),
              })
              .then((res) => {
                window.location.href = `${env.aff}/profile`;
              });
          } catch (error) {}
        });
    } catch (error) {}
  };
  const getDol = async () => {
    try {
      await axios.get(`${env.url}/dol`).then((res) => {
        updateBal(Number(priceURl) / Number(res.data.data.dollar));
      });
    } catch (error) {}
  };
  useEffect(() => {
    if (parsed.success === "true") {
      getDol();
    } else {
      window.location.href = `${env.aff}/profile`;
    }
  }, []);
  return (
    <>
      {parsed.success === "true" ? (
        <FontAwesomeIcon className="icon-suc" icon={faThumbsUp} />
      ) : (
        <FontAwesomeIcon className="icon-fail" icon={faXmark} />
      )}
    </>
  );
};

// window.location.search.slice(41,-804)
export default Success;
