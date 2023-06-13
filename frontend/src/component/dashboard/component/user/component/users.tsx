import React, { useState } from "react";
import photo from "../../../../../image/blank-profile-picture-gc8e2267bd_1280.png";
import axios from "axios";
import env from "../../../../../environments/enviroments";
import IdUser from "./idUser";
import EditUser from "./editUser";
const UsersF = (props) => {
  const [order, setOrder] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const deleteUser = async (id) => {
    try {
      await axios
        .delete(`${env.url}/users/${id}`)
        .then(() => window.location.reload());
    } catch (error) {}
  };
  const getOrders = async (id) => {
    try {
      await axios
        .get(`${env.url}/order/user/${id}`)
        .then((res) => setOrder(res.data.data));
    } catch (error) {}
  };
  const getTransaction = async (id) => {
    try {
      await axios
        .get(`${env.url}/transaction/user/${id}`)
        .then((res) => setTransaction(res.data.data));
    } catch (error) {}
  };
  //edit user

  return (
    <>
      {props.dataUser.map((u: any): any => (
        <>
          <div className={`container-user ${u.statusaccess}`}>
            <div
              className="photo"
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop${u.id}`}
              onClick={() => {
                getOrders(u.id);
                getTransaction(u.id);
              }}
            >
              <img
                alt=""
                className="img"
                src={`${
                  u.imgprofile === ""
                    ? photo
                    : u.imgprofile === null
                    ? photo
                    : `${env.ver}/image/${u.imgprofile}`
                }`}
              />
            </div>

            <div className="email">
              <span className="title-u">email: </span>
              <span className="get">{u.email}</span>
            </div>
            <div className="number">
              <span className="title-u">number: </span>
              <span className="get">{u.number}</span>
            </div>
            <div className="balance">
              <span className="title-u">balance: </span>
              <span className="get">{`${Number(u.balance).toFixed(2)}$`}</span>
            </div>
            <EditUser u={u} key={u.id} />
          </div>

          {/*edit*/}

          {/* pop up */}
          <div
            className="modal fade"
            id={`staticBackdrop${u.id}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    whale4trade
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="info">
                    <h2 className="title-info">info</h2>
                    <div className="email">
                      <span className="title-u">email: </span>
                      <span className="get">{u.email}</span>
                    </div>
                    <div className="number">
                      <span className="title-u">number: </span>
                      <span className="get">{u.number}</span>
                    </div>
                    <div className="number">
                      <span className="title-u">username: </span>
                      <span className="get">{u.username}</span>
                    </div>
                    <div className="balance">
                      <span className="title-u">balance: </span>
                      <span className="get">{u.balance}$</span>
                    </div>
                    <IdUser u={u} />
                    <div className="statusaccess">
                      <span className="title-u">status Access: </span>
                      <span className="get">{u.statusaccess}</span>
                    </div>
                    <div className="tree">
                      <span className="title-u">tree: </span>
                      <span className="get">{u.tree}</span>
                    </div>
                    <div className="tree">
                      <span className="title-u">win: </span>
                      <span className="get">{u.win}$</span>
                    </div>
                  </div>
                  <div className="bundle">
                    <h2 className="h2">bundle</h2>
                    {order.map((o: any): any => (
                      <div className="con-ti">
                        <div>name: {o.name}</div>
                        <div>price: {o.price}$</div>
                        <div>
                          time buy: {new Date(o.timebuy).toDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="trans">
                    <h2 className="title-info">transaction</h2>
                    {transaction.map((t: any): any => (
                      <div className="con-ti">
                        <div>{t.category}</div>
                        <div>price: {t.price}</div>
                        <div>
                          time buy: {new Date(t.timejoin).toDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteUser(u.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default UsersF;
