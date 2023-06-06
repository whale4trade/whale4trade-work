import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";
const Clime = (props) => {
  const [dis, setDis] = useState<any>("");
  const [hour, sethours] = useState<any>("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const checkWin = () => {
    if (hour <= 0) {
      if (minutes <= 0) {
        if (seconds <= 0) {
          updateEveryDayBalance();
        }
      }
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
                        axios
                          .patch(
                            `${env.url}/order/timeWin/${props.bundleInfo.id}`,
                            {
                              id: props.bundleInfo.id,
                              timeWin: Date.now(),
                            }
                          )
                          .then(() => {
                            window.location.reload();
                          });
                      } catch (error) {}
                    });
                } catch (error) {}
              });
          } catch (error) {}
        });
    } catch (error) {}
  };

  useEffect(() => {
    // console.log(props.bundleInfo);

    const target = new Date(Number(props.bundleInfo.timewin));
    target.setDate(target.getDate() + 1);
    const difference = target.getTime() - new Date().getTime();
    const h = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    sethours(h);
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    setMinutes(m);
    const s = Math.floor((difference % (1000 * 60)) / 1000);
    setSeconds(s);
  }, [checkWin]);
  //
  return (
    <>
      <input
        className={`btn btn-${
          hour > 0
            ? "secondary"
            : minutes > 0
            ? "secondary"
            : seconds > 0
            ? "secondary"
            : "primary"
        } clime ${dis}`}
        value={`${
          hour > 0
            ? `clime after ${hour} h : ${minutes} m`
            : minutes > 0
            ? `clime after ${hour} h : ${minutes} m`
            : seconds > 0
            ? `clime after ${hour} h : ${minutes} m`
            : `clime`
        }  `}
        onClick={checkWin}
        readOnly={true}
      />
    </>
  );
};

export default Clime;
