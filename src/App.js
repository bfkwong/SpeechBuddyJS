import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import SingleText from "./components/SingleText/SingleText";
import MultiText from "./components/MultiText/MultiText";
import TwoTxtSent from "./components/TwoTxtSent/TwoTxtSent";
import { Route, Switch, BrowserRouter, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/SpeechBuddyJS/home">Speech Buddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Text Analysis" id="basic-nav-dropdown">
                <NavDropdown.Item as="span">
                  <Link to="/SpeechBuddyJS/single_text">
                    Single Text Analysis
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="span">
                  <Link to="/SpeechBuddyJS/two_txt_plag">
                    Two Text Analysis
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="span">
                  <Link to="/SpeechBuddyJS/multi_text">
                    Multi Text Analysis
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Speech Analysis" id="basic-nav-dropdown">
                <NavDropdown.Item>Speech Analysis</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Stopword Analysis
                </NavDropdown.Item>
              </NavDropdown>
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