import "./home.css";
import Forex from "./component/forex";
import Background from "./component/background";

import Bundle from "./component/bundleRev";
import About from "./component/about";
import Contact from "./component/contacet";

const Home = (props) => {
  return (
    <>
      {/* // container for home page */}
      <Background />
      <div className="container home-page">
        {/* for chart forex with price and async per min */}
        <Forex />
        <Bundle />
        {/* for slide img for product  */}
      </div>
      <div className="footer">
        <About />
        <Contact />
      </div>
    </>
  );
};

export default Home;
