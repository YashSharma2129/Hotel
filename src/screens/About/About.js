import React from "react";
import "./About.css";
import hotelVideo from "../../imgs/video.mp4";
import { Link } from "react-router-dom";
import MyFooter from "../../components/Footer/MyFooter";
import MyCopyright from "../../components/Copyright/MyCopyright";

const About = () => {
  return (
    <div>
      <section class="heading">
        <video autoPlay loop class="video-background" muted plays-inline>
          <source src={hotelVideo} type="video/mp4" />
        </video>

        <center>
          <div class="welcome-msg ">
            <h1> About Tiwari Hotels </h1>
            <p>
              Twiari Hotels, founded in 2020 by Yug Tiwari, is an Indian
              hospitality brand offering leased and franchised hotels, homes,
              and living spaces. Initially focused on budget accommodations,
              Twitari has rapidly grown into a global presence with thousands of
              hotels, vacation homes, and millions of rooms across India,
              Malaysia, UAE, Nepal, China, Brazil, Mexico, UK, Philippines,
              Japan, Saudi Arabia, Sri Lanka, Indonesia, Vietnam, the United
              States, and beyond.
            </p>
            <Link to="rooms">
              {" "}
              <a class="btn btn-book btna"> Book Room </a>{" "}
            </Link>
            <Link to="/">
              {" "}
              <a class="btn btn-home btna"> Return to Home</a>
            </Link>
          </div>
        </center>
      </section>
      <MyFooter />
      <MyCopyright />
    </div>
  );
};

export default About;
