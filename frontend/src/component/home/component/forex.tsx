import logoBtc from "../../../image/forex/BTC.png";
import logoBRL from "../../../image/ICON_BRL.svg";
import logoEUR from "../../../image/forex/EUR.png";
import logoAED from "../../../image/forex/AED.png";
import CAD from "../../../image/forex/CAD.png";
import GBP from "../../../image/forex/GBP.png";
import JPY from "../../../image/forex/JPY.png";
import QAR from "../../../image/forex/QAR.jpeg";
import KWD from "../../../image/forex/KWD.png";
import CHF from "../../../image/forex/CHF.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../../environments/enviroments";

const Forex = () => {
  const [chart, setChart] = useState<any>({});
  const fetchForex = async () => {
    try {
      await axios
        .get(`https://api.fastforex.io/fetch-all?api_key=${env.api_key}`)
        .then((res) => {
          setChart(res.data.results);
        });
    } catch (error) {}
  };
  useEffect(() => {
    fetchForex();
  }, []);
  const [btcToUsd, setBtcToUsd] = useState<any>(null);
  useEffect(() => {
    axios
      .get(
        `https://api.fastforex.io/crypto/fetch-prices?pairs=BTC%2FUSDT&api_key=${env.api_key}`
      )
      .then((res) => {
        setBtcToUsd(res.data.prices["BTC/USDT"]);
      })
      .catch((error) => {});
  }, []);
  // const req = `${btcToUsd["BTC/USDT"]}`;
  return (
    <>
      <div className={`container-usd animate__animated animate__bounceInUp`}>
        <div>
          <img src={logoBtc} alt="" />
          <span className="name-usd">BTC/USD :</span>
          <span className="number-used">{`${btcToUsd}$`}</span>
        </div>

        <div>
          <img src={logoEUR} alt="" />
          <span className="name-usd">EUR/USD :</span>
          <span className="number-used">{`${chart.EUR}$`}</span>
        </div>

        <div>
          <img src={logoAED} alt="" />
          <span className="name-usd">AED/USD :</span>
          <span className="number-used">{`${chart.AED}$`}</span>
        </div>
        <div>
          <img src={logoBRL} alt="" />
          <span className="name-usd">BRL/USD :</span>
          <span className="number-used">{`${chart.BRL}$`}</span>
        </div>
        <div>
          <img src={CAD} alt="" />
          <span className="name-usd">CAD/USD :</span>
          <span className="number-used">{`${chart.CAD}$`}</span>
        </div>
        <div>
          <img src={GBP} alt="" />
          <span className="name-usd">GBP/USD :</span>
          <span className="number-used">{`${chart.GBP}$`}</span>
        </div>
        <div>
          <img src={JPY} alt="" />
          <span className="name-usd">JPY/USD :</span>
          <span className="number-used">{`${chart.JPY}$`}</span>
        </div>

        <div>
          <img src={QAR} alt="" />
          <span className="name-usd">QAR/USD :</span>
          <span className="number-used">{`${chart.QAR}$`}</span>
        </div>
        <div>
          <img src={KWD} alt="" />
          <span className="name-usd">KWD/USD :</span>
          <span className="number-used">{`${chart.KWD}$`}</span>
        </div>
        <div>
          <img src={CHF} alt="" />
          <span className="name-usd">CHF/USD :</span>
          <span className="number-used">{`${chart.CHF}$`}</span>
        </div>
      </div>
    </>
  );
};

export default Forex;
