import env from "../environments/enviroments";
import axios from "axios";
const ConfirmUser = async () => {
  const check = async () => {
    try {
      axios
        .get(`${env.url}/users/${JSON.parse(localStorage.user).id}`)
        .then((res) => {
          res.data.data === undefined
            ? (window.location.pathname = "/login")
            : console.log("no");
        });
    } catch (error) {
      window.location.pathname = "/login";
    }
  };
  // console.log(localStorage.user === "null");

  if (localStorage.user === "null") {
    window.location.pathname = "/login";
  } else if (localStorage.user === undefined) {
    window.location.pathname = "/login";
  } else {
    check();
  }
  return <></>;
};

export default ConfirmUser;
