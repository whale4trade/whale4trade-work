const UserInfoDashReq = (props) => {
  return (
    <>
      <div className="info">
        <h2 className="title-info">info</h2>
        <div className="email">
          <span className="title-u">email: </span>
          <span className="get">{props.u.email}</span>
        </div>
        <div className="number">
          <span className="title-u">number: </span>
          <span className="get">{props.u.number}</span>
        </div>
        <div className="balance">
          <span className="title-u">balance: </span>
          <span className="get">{props.u.balance}$</span>
        </div>
        <div className="statusaccess">
          <span className="title-u">statusaccess: </span>
          <span className="get">{props.u.statusaccess}</span>
        </div>
        <div className="tree">
          <span className="title-u">tree: </span>
          <span className="get">{props.u.tree}</span>
        </div>
      </div>
    </>
  );
};

export default UserInfoDashReq;
