import imgBackground from "../../../image/wallpaperflare.com_wallpaper (6).jpg";
import { useEffect, useState } from "react";
const Background = (props) => {
  const [back, setBack] = useState<any>("");
  useEffect(() => {
    window.screen.width === 780
      ? setBack("photo_2023-05-14_05-05-59.jpg")
      : setBack("../../../image/wallpaperflare.com_wallpaper (6).jpg");
  }, []);
  return (
    <>
      {" "}
      {/* <div className="img"> */}
      <div className="d-block  img-background" />
      {/* </div> */}
    </>
  );
};

export default Background;
