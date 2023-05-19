const InfoBundle = (props) => {
  return (
    <>
      <div
        className="modal fade"
        id={`exampleModal${props.b.id}`}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                whale4trade
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="name">
                <span className="s">name:</span>
                <span className="ti">{props.b.name}</span>
              </div>
              <div className="name">
                <span className="s">category: </span>
                <span className="ti">{props.b.category}</span>
              </div>
              <div className="name">
                <span className="s">description: </span>
                <span className="ti">{`${props.b.description}`}</span>
              </div>
              <div className="name">
                <span className="s">price: </span>
                <span className="ti">{props.b.price}$</span>
              </div>
              <div className="name">
                <span className="s">timecreated: </span>
                <span className="ti">{props.b.timecreated}</span>
              </div>
              <div className="name">
                <span className="s">win: </span>
                <span className="ti">{props.b.win}$</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBundle;
