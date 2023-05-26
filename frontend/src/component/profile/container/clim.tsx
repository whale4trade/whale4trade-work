import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";
const Clim = (props) => {
  const [dis, setDis] = useState<any>("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("click")!)
  );
  let currentTime = new Date().getHours();
  let displayTime =
    currentTime > 12 ? `${currentTime - 12} PM` : `${currentTime + 12} AM`;
  useEffect(() => {
    if (localStorage.click !== "null") {
      const target = new Date(Number(JSON.parse(localStorage.click).time));
      target.setDate(target.getDate() + 1);
      const difference = target.getTime() - new Date().getTime();
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      console.log(currentTime);

      if (currentTime === 0) {
        if (localStorage.click === "null") {
          console.log("yes");
          setDis("");
        } else if (h === 0) {
          setDis("");
        } else {
          setDis("dis");
        }
      } else {
        setDis("dis");
        console.log("no");
      }
      if (dis === "click") {
        setTimeout(() => {
          setDis("");
        }, 1000 * 60 * 70);
      }
    }
  }, []);

  // const target = new Date(Number(5));

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

              .then(() => {
                setCurrentUser({ time: Date.now() });
              });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {}
  };
  useEffect(() => {
    localStorage.setItem("click", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <>
      <input
        className={`btn btn-primary ${dis}`}
        value={`${displayTime === "10 PM" ? "clime" : displayTime}`}
        onClick={updateEveryDayBalance}
      />
    </>
  );
};

export default Clim;
