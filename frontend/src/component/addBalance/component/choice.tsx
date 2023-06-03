import vodafoneCash from "../../../image/download (2).png";
import card from "../../../image/CARD.jpg";
const Choice = (props) => {
  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          onChange={props.handelChange}
          id="flexRadioDefault1"
          value="vodafone"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          <img src={vodafoneCash} alt="" />
        </label>
        {props.input.flexRadioDefault === "vodafone" ? (
          <input
            type="phone"
            onChange={props.handelChange}
            name="number"
            placeholder="enter your number"
            className="phone"
          />
        ) : null}
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          onChange={props.handelChange}
          value="card"
          id="flexRadioDefault2"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          {/* <FontAwesomeIcon icon={faCreditCard} /> */}
          <img src={card} alt="" />
        </label>
      </div>
    </>
  );
};

export default Choice;
