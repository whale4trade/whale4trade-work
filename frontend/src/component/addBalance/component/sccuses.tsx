import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";

const Success = () => {
  const priceURl = window.location.search.slice(41, -804);

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
                window.location.pathname = "/profile";
              });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getDol = async () => {
      try {
        await axios.get(`${env.url}/dol`).then((res) => {
          updateBal(Number(priceURl) / Number(res.data.data.dollar));
        });
      } catch (error) {
        console.log(error);
      }
    };
    getDol();
  }, [priceURl]);
  return (
    <>
      <FontAwesomeIcon className="icon-suc" icon={faThumbsUp} />
    </>
  );
};

// window.location.search.slice(41,-804)
export default Success;
