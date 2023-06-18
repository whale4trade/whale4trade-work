import axios from "axios";
import env from "../../../environments/enviroments";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import img2 from "../../../../../api/images/1681819307935.png";
import Win from "./win";
import ImgUser from "./imgUser";

const UserProfile = () => {
  const [isActive, setIsActive] = useState(false);
  const [dataUser, setDataUser] = useState<any>({
    username: JSON.parse(localStorage.user).username,
    email: JSON.parse(localStorage.user).email,
    number: JSON.parse(localStorage.user).number,
    balance: JSON.parse(localStorage.user).balance,
    imgprofile: JSON.parse(localStorage.user).imgprofile,
    statusaccess: "d",
  });
  const [err, setErr] = useState("");
  const [errUser, setErrUser] = useState<any>("");
  const [errOrder, setErrOrder] = useState<any>("");
  const navigate = useNavigate();

  const handelChange = (e) => {
    setDataUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(dataUser);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios
        .patch(
          `${env.url}/users/${JSON.parse(localStorage.user).id}`,
          {
            email: dataUser.email,
            username: dataUser.username,
            number: dataUser.number,
            imgprofile: dataUser.imgprofile,
            bundleName: dataUser.bundlename,
            bundleId: dataUser.bundleid,
            statusAccess: dataUser.statusaccess,
            id: dataUser.id,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) =>
          localStorage.setItem("user", JSON.stringify(res.data.data))
        )
        .then(() => setIsActive((current) => !current))
        .then(() =>
          setTimeout(() => {
            setIsActive((current) => !current);
          }, 3000)
        )
        .then(() => window.location.reload());
    } catch (err: any) {
      setErr(err.response.data.message);
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
        .then((res: any) => setDataUser(res.data.data));
    } catch (error) {
      setErrUser("please login");
      setTimeout(() => {
        setErr("");
        navigate("login");
      }, 1000);
    }
  }, []);

  const [dataBundle, setDataBundle] = useState<any[]>([]);
  useEffect(() => {
    try {
      axios
        .get(`${env.url}/order/user/${JSON.parse(localStorage.user).id}`)
        .then((res: any) => setDataBundle(res.data.data));
    } catch (error) {
      setErrOrder("error : not complete");
      setTimeout(() => {
        setErrOrder("");
      }, 1000);
    }
  }, [setDataBundle]);

  const [dataTree, setDataTree] = useState([]);
  const [errTree, setErrTree] = useState<any>([]);
  const handleClick = async () => {
    try {
      await axios
        .get(`${env.url}/tree/${JSON.parse(localStorage.user).id}`)
        .then((res) => setDataTree(res.data.data));
    } catch (err: any) {
      setErrTree("error : not complete");
      setTimeout(() => {
        setErrTree("");
      }, 1000);
    }
  };
  useEffect(() => {
    handleClick();
  }, []);

  const [Tree, setTree] = useState([]);
  const handleTree = async () => {
    try {
      await axios
        .get(`${env.url}/tree/${JSON.parse(localStorage.user).id}`)
        .then((res) => setTree(res.data.data));
    } catch (err: any) {}
  };
  useEffect(() => {
    handleTree();
  }, []);

  return (
    <div className="user">
      <div className="photo">
        <ImgUser user={dataUser} />
      </div>
      <div className="info">
        <span className="email">
          <span>
            <span className="title">email:</span>
            <span className="test">{`${dataUser!.email}`}</span>
          </span>
        </span>
        <div className="ha">
          <div>
            {" "}
            <span className="name">
              <span className="title">username:</span>
              <span className="test">{`${dataUser!.username}`}</span>
            </span>
            <span className="balance">
              <span className="title">balance: </span>
              <span className="test">{`${Number(dataUser!.balance).toFixed(
                2
              )}$`}</span>
            </span>
          </div>
          <div>
            {" "}
            <span className="number">
              <span className="title">number:</span>
              <span className="test">{`${dataUser!.number}`}</span>
            </span>
            <span className="win">
              <span className="title">win:</span>
              <Win />
            </span>
          </div>
        </div>
      </div>
      <div className="button">
        {dataUser.statusaccess === "admin" ? (
          <span className="access">
            <NavLink to="/dashboard">
              <input
                className="btn btn-primary edit-icon"
                type="button"
                value="dash board"
              />
            </NavLink>
          </span>
        ) : (
          ""
        )}
        <input
          type="button"
          value="withdraw"
          className="btn btn-primary edit-icon"
          onClick={() => {
            navigate("/request");
          }}
        />
        <span className="edit-icon">
          <input
            type="button"
            className="btn btn-primary edit-icon"
            value="update"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal3"
          />
          <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div
              id="liveToast"
              className={`toast fade ${isActive ? "show" : "hide"} `}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header">
                <strong className="me-auto">Whale4trade</strong>
                <small>Just Now</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
              <div className="toast-body">update your profile</div>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModal3"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    update your email
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="email"
                    onChange={handelChange}
                    name="email"
                    placeholder="your new email"
                  />
                  <input
                    type="username"
                    onChange={handelChange}
                    name="username"
                    placeholder="your new username"
                  />
                  <input
                    type="number"
                    onChange={handelChange}
                    name="number"
                    placeholder="your new number"
                  />
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
                    onClick={handleUpdate}
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </span>
        <NavLink to="/addBalance" className="edit-icon">
          <span className="btn btn-primary">Add Balance</span>
        </NavLink>
      </div>
      <div className="err">{err && err}</div>
      <div className="count">
        <div className="tree">
          <span className="title"> affiliate: </span>
          <span>{Tree.length}</span>
        </div>
        <div className="line"></div>
        <div className="bundle">
          <span className="title"> bundle: </span>
          <span>{dataBundle.length}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
