import axios from "axios";
import env from "../../../environments/enviroments";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Bundle = (props) => {
  const navigate = useNavigate();

  const [saveGetBundle, setSaveGetBundle] = useState([]);
  const handelNavigate = () => {
    navigate("/products");
  };
  const getBundle = async () => {
    try {
      await axios.get(`${env.url}/bundle`).then((res) => {
        setSaveGetBundle(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBundle();
  }, []);
  console.log();

  return (
    <>
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <h3 className="animate-charcter"> Bundle</h3>

        <div className="carousel-inner">
          {saveGetBundle
            .filter((p: any) => p.category !== "hide")
            .map((p: any): any => (
              <>
                <div
                  key={p.id}
                  className="carousel-item active"
                  data-bs-interval="10000"
                >
                  <img
                    src={`${env.ver}/image/${p.imgbundle}`}
                    onClick={() => handelNavigate()}
                    className="d-block w-50"
                    alt="..."
                  />
                </div>
              </>
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Bundle;
