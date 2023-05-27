import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";

const Success = () => {
  const [price, setPrice] = useState("");
  const priceURl = window.location.search.slice(41, -804);
  const bla = Number(price) / Number(priceURl);
  const getDol = async () => {
    try {
      await axios
        .get(`${env.url}/dol`)
        .then((res) => setPrice(res.data.data.dollar))
        .then(() => {
          updateBal();
        });
    } catch (error) {
      console.log(error);
    }
  };
  const updateBal = async () => {
    try {
      await axios
        .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
        .then((res) => {
          try {
            axios.patch(`${env.url}/users/balance/${res.data.data.id}`, {
              id: res.data.data.id,
              balance: Number(res.data.data.balance) + Number(bla),
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
    getDol();
  }, []);
  return (
    <>
      <FontAwesomeIcon className="icon-suc" icon={faThumbsUp} />
    </>
  );
};

// window.location.search.slice(41,-804)
export default Success;
