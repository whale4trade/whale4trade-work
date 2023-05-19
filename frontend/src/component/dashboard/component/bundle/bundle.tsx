import React, { useEffect, useState } from "react";
import axios from "axios";
import BundleF from "./component/title";
import env from "../../../../environments/enviroments";
import InfoBundle from "./component/infoBundle";
import DeleteBundle from "./component/deleteBundle";
import EditBundle from "./component/editBundle";

const Bundle = (props) => {
  const [bundleDash, setBundleDash] = useState<any>([]);

  const getBundleDash = async () => {
    try {
      await axios
        .get(`${env.url}/bundle`)
        .then((res: any) => setBundleDash(res.data.data));
    } catch (error) {}
  };
  const deleteBundle = async (id) => {
    try {
      await axios
        .delete(`${env.url}/bundle/${id}`)
        .then(() => window.location.reload());
    } catch (error) {}
  };

  useEffect(() => {
    getBundleDash();
  }, []);
  const [input, setInput] = useState({
    win: "",
    price: "",
    category: "",
  });
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const editBundle = async (id, name) => {
    try {
      await axios
        .patch(`${env.url}/bundle/${id}`, {
          id: id,
          name: name,
          price: input.price,
          win: input.win,
          imgbundle: "",
          category: input.category,
        })
        .then(() => window.location.reload());
    } catch (error) {}
  };

  // const
  return (
    <>
      <div className="container c-bundle">
        <BundleF bundleDash={bundleDash} />
        <div className="bundle">
          {bundleDash.map((b: any) => (
            <>
              <div className="con-bundle" key={b.id}>
                <img
                  src={`${env.ver}/image/${b.imgbundle}`}
                  alt=""
                  className="rounded"
                />
                <InfoBundle b={b} />
                <div
                  className="info"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal${b.id}`}
                >
                  <div className="name">
                    <span className="s">name:</span>
                    <span className="ti">{b.name}</span>
                  </div>

                  <div className="price">
                    <span className="s">new price:</span>
                    <span className="ti">{b.price}$</span>
                  </div>
                </div>
                <div className="user-count">
                  <span className="s">category:</span>
                  <span className="ti">{b.category}</span>
                </div>
                <EditBundle b={b} />
                <DeleteBundle b={b} />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bundle;
