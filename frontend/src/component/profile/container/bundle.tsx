/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import env from "../../../environments/enviroments";

// };
const Bundle = (props) => {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const updateEveryDayBalance = async () => {
    try {
      await axios
        .get(`${env.url}/users/${props.bundleInfo.userid}`)
        .then((res) => {
          console.log(
            Number(res.data.data.balance) + Number(props.bundleInfo.win) / 30
          );

          try {
            axios
              .patch(`${env.url}/users/balance/${res.data.data.id}`, {
                id: res.data.data.id,
                balance:
                  Number(res.data.data.balance) +
                  Number(props.bundleInfo.win) / 30,
              })
              .then((res) => {
                // console.log(res.data.data.balance);
              });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {}
  };

  useEffect(() => {
    const target = new Date(Number(props.bundleInfo.timebuy));
    target.setDate(target.getDate() + 30);
    target.toDateString();

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
      // updateEveryDayBalance();
    }, 1000);

    return () => clearInterval(interval);
  }, [props.bundleInfo]);

  return (
    <>
      {partyTime ? (
        <>
          <h1>you are should subscribe in bundle</h1>
        </>
      ) : (
        <>
          <div className="bundle">
            <span className="title-bundle">Bundle:</span>
            <span className="bundle">{props.bundleInfo.name}</span>
          </div>
          <CircularProgressbar
            value={days}
            text={`${days}days`}
            maxValue={30}
          />

          <div className="timer" aria-label="l">
            <span className="s">days:</span>
            <span className="time">{days}</span>
            <span className="s">hours:</span>
            <span className="time">{hours}</span>
            <span className="s">minutes:</span>
            <span className="time">{minutes}</span>
            <span className="s">seconds:</span>
            <span className="time">{seconds}</span>
          </div>
          <nav aria-label="Page navigation example" className="nav">
            <ul className="pagination">
              {props.numbers.map((n, i) => (
                <li
                  className={`page-item ${
                    props.currentPage === n ? "active" : ""
                  }`}
                  key={i}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => props.changeCPage(n)}
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Bundle;
