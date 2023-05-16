import img from "../../../image/blank-profile-picture-gc8e2267bd_1280.png";

const ImgUser = (props) => {
  console.log(props.user);

  return (
    <>
      <img src={`${img}`} alt="" />
    </>
  );
};

export default ImgUser;
