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

      .catch((error) => {});
  };

  return (
    <>
      <img
        src={`${
          props.user.imgprofile === ""
            ? img
            : `${env.ver}/image/${props.user.imgprofile.imgbundle}`
        }`}
        alt=""
      />
    </>
  );
};

export default ImgUser;
