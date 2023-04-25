import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/uploads")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {images.map((image) => (
        <img src={`/image/${image}`} alt={image} key={image} />
      ))}
    </div>
  );
}
export default ImageList;
