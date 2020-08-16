import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import SingleText from "./components/SingleText/SingleText";
import MultiText from "./components/MultiText/MultiText";
import TwoTxtSent from "./components/TwoTxtSent/TwoTxtSent";
import { Route, Switch, BrowserRouter, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Logo3 from "./Images/Logo3.png";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/SpeechBuddyJS/home">
            <img src={Logo3} alt="React Bootstrap logo" />
          </Navbar.Brand>
          <Navbar.Brand href="/SpeechBuddyJS/home">Speech Buddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as="span">
                <Link to="/SpeechBuddyJS/single_text">
                  Single Text Analysis
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link to="/SpeechBuddyJS/two_txt_plag">Two Text Analysis</Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link to="/SpeechBuddyJS/multi_text">Multi Text Analysis</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/SpeechBuddyJS">
            <HomePage></HomePage>
          </Route>
          <Route exact path="/SpeechBuddyJS/home">
            <HomePage></HomePage>
          </Route>
          <Route exact path="/SpeechBuddyJS/single_text">
            <SingleText></SingleText>
          </Route>
          <Route
            exact
            path="/SpeechBuddyJS/two_txt_plag"
            component={TwoTxtSent}></Route>
          <Route exact path="/SpeechBuddyJS/multi_text">
            <MultiText></MultiText>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
