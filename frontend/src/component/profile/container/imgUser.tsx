import img from "../../../image/blank-profile-picture-gc8e2267bd_1280.png";
import env from "../../../environments/enviroments";
const ImgUser = (props) => {
  console.log();

  return (
    <>
      <img
        src={`${
          props.user.imgprofile === ""
            ? img
            : `${env.ver}/image/${props.user.imgprofile}`
        }`}
        alt=""
      />
    </>
  );
};

export default ImgUser;
