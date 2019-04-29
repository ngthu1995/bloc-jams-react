import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Album from "./components/Album";
import logo from "./img/jams-logo-white.png";
import "./footer.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/">
              <img className="jam-logo" src={logo} alt="logo" />
            </Link>
            <Link className="nav-link" to="/library">
              Albums
            </Link>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
        <footer>
          <div className="card">
            <p className="">Copyright © Thu Nguyen 2019</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
