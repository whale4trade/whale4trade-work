import img from "../../../image/blank-profile-picture-gc8e2267bd_1280.png";
import env from "../../../environments/enviroments";
import React, { useState } from "react";
import axios from "axios";
const ImgUser = (props) => {
  console.log();
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(`${env.ver}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        try {
          axios.patch(
            `${env.url}/users/img/${JSON.parse(localStorage.user).id}`,
            {
              id: JSON.parse(localStorage.user).id,
              imgprofile: res.data,
            }
          );
        } catch (error) {
          console.log(error);
        }
      })
      .then(() => {
        window.location.reload();
      })

      .catch((error) => {});
  };

  return (
    <>
      <img
        src={`${
          props.user.imgprofile === ""
            ? img
            : `${env.ver}/image/${props.user.imgprofile}`
        }`}
        alt=""
        data-bs-toggle="modal"
        data-bs-target="#exampleModalUpdateImg"
      />
      <div
        className="modal fade"
        id="exampleModalUpdateImg"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                update your img
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="file" name="" onChange={handleFileChange} id="" />
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
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImgUser;
