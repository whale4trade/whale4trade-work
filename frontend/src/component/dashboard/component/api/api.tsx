import axios from "axios";
import { useState, useEffect } from "react";
import "./api.css";
import env from "../../../../environments/enviroments";
const Api = () => {
  const [dataApi, setDataApi] = useState<any>([]);
  const [start, setStart] = useState<any>([]);
  const [end, setEnd] = useState<any>([]);
  const [quota, setQuota] = useState<any>([]);
  const [usage, setUsage] = useState<any>([]);
  const apiUsage = async () => {
    await axios
      .get(`https://api.fastforex.io/usage?api_key=${env.api_key}`)
      .then((res) => {
        setDataApi(res.data);
        setStart(res.data.current_period.start);
        setEnd(res.data.current_period.end);
        setQuota(res.data.current_period.remaining_quota);
        setUsage(res.data.current_period.usage);
        console.log("done");
      });
  };
  useEffect(() => {
    apiUsage();
  }, []);
  return (
    <>
      <div className="co-api ">
        <div>
          <span>monthly quota: </span>
          <span>{dataApi.monthly_quota} request</span>
        </div>
        <div>
          <span>start: </span>
          <span>{`${start}`}</span>
        </div>
        <div>
          <span>end: </span>
          <span>{end}</span>
        </div>
        <div>
          <span>remaining quota: </span>
          <span>{quota}</span>
        </div>
        <div>
          <span>usage: </span>
          <span>{usage}</span>
        </div>
      </div>
    </>
  );
};

export default Api;
