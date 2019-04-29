import React from "react";
import "./../img/dog-landingpage.jpg";
import spaceShip from "./../img/spaceship.png";
import "./../landing.css";
import { Route, Link } from "react-router-dom";

const Landing = () => (
  <section className="landing">
    <div className="container">
      <h1 className="container-title">Let your music speak</h1>
      <Link className="nav-link" to="/library">
        <button className="landing_btn">Start listening now</button>
      </Link>
    </div>

    <h2 className="title">Why Jam?</h2>

    <section className="selling-points">
      <img className="selling-points-left" src={spaceShip} />
      <div className="selling-points-right">
        <div className="point">
          <h3 className="point-title">Choose your music</h3>
          <p className="point-description">
            The world is full of music. Why should you have to listen to music
            that someone else chose?
          </p>
        </div>
        <div className="point">
          <h3 className="point-title">Unlimited,streaming, ad-free</h3>
          <p className="point-description">
            No arbitrary limits. No distractions.
          </p>
        </div>
        <div className="point">
          <h3 className="point-title">Mobile enabled</h3>
          <p className="point-description">
            Listen to your music on the go. This streaming service is available
            on all mobile plafforms.
          </p>
        </div>
      </div>
    </section>
  </section>
);

export default Landing;
