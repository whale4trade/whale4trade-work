import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";
const Clime = (props) => {
  const [dis, setDis] = useState<any>("");
  const [hour, sethours] = useState<any>("");

  const checkWin = () => {
    if (hour <= 0) {
      updateEveryDayBalance();
    } else {
      console.log("no");
    }
  };

  const updateEveryDayBalance = async () => {
    setDis("click");
    try {
      await axios
        .get(`${env.url}/users/${props.bundleInfo.userid}`)
        .then((res) => {
          setDis("click");

          try {
            axios
              .patch(`${env.url}/users/balance/${res.data.data.id}`, {
                id: res.data.data.id,
                balance:
                  Number(res.data.data.balance) +
                  Number(props.bundleInfo.win) / 30,
              })
              .then((res) => {
                try {
                  axios
                    .patch(
                      `${env.url}/users/win/${
                        JSON.parse(localStorage.user).id
                      }`,
                      {
                        id: res.data.data.id,
                        win:
                          Number(res.data.data.win) +
                          Number(props.bundleInfo.price) / 30,
                      }
                    )
                    .then(() => {
                      try {
                        axios.patch(
                          `${env.url}/order/timeWin/${props.bundleInfo.id}`,
                          {
                            id: props.bundleInfo.id,
                            timeWin: Date.now(),
                          }
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    });
                } catch (error) {
                  console.log(error);
                }
              });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {}
  };

  useEffect(() => {
    const target = new Date(Number(props.bundleInfo.timewin));
    target.setDate(target.getDate() + 1);
    const difference = target.getTime() - new Date().getTime();
    const h = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    sethours(h);
  }, [checkWin]);

  return (
    <>
      <input
        className={`btn btn-primary ${dis}`}
        value={`${hour <= 0 ? `clime` : `${hour} hours`}   `}
        onClick={checkWin}
      />
    </>
  );
};

export default Clime;
