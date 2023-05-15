// import imgBackground from "../../../image/photo_2023-05-15_04-38-36.jpg";
import imgBackground from "../../../image/photo_2023-05-14_05-05-59.jpg";
// import imgBackground from "../../../image/photo_2023-05-14_05-04-49.jpg";
const Background = (props) => {
  return (
    <>
      {" "}
      {/* <div className="img"> */}
      <img src={imgBackground} className="d-block  img-background" alt="" />
      {/* </div> */}
    </>
  );
};

export default Background;
