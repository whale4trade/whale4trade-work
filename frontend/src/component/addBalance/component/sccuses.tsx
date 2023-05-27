import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";

const Success = () => {
  const [price, setPrice] = useState("");
  useEffect(() => {
    const priceURl = window.location.search.slice(41, -804);
    const bla = Number(price) / Number(priceURl);
    try {
      axios.get(`${env.url}/dol`).then((res) =>
        setPrice(res.data.data.dollar).then(() => {
          try {
            axios
              .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
              .then((res) => {
                try {
                  axios
                    .patch(`${env.url}/users/balance/${res.data.data.id}`, {
                      id: res.data.data.id,
                      balance: Number(res.data.data.balance) + Number(bla),
                    })
                    .then((res) => {
                      console.log(res);
                    });
                } catch (error) {
                  console.log(error);
                }
              });
          } catch (error) {}
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <FontAwesomeIcon className="icon-suc" icon={faThumbsUp} />
    </>
  );
};

// window.location.search.slice(41,-804)
export default Success;
