import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
const Success = () => {
  const price = window.location.search.slice(41, -804);
  console.log(price);

  return (
    <>
      <FontAwesomeIcon className="icon-suc" icon={faThumbsUp} />
    </>
  );
};

// window.location.search.slice(41,-804)
export default Success;
