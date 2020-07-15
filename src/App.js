import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import SingleText from "./components/SingleText/SingleText";
import MultiText from "./components/MultiText/MultiText";
import TwoTxtSent from "./components/TwoTxtSent/TwoTxtSent";

const SINGLE_TEXT = "SINGLE_TEXT";
const MULTI_TEXT = "MULTI_TEXT";
const PLAGIARISM_TEXT = "PLAGIARISM_TEXT";
const SPEECH_ANALYSIS = "SPEECH_ANALYSIS";

function App() {
  const [display, setDisplay] = useState("SINGLE_TEXT");

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Speech Buddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Text Analysis" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => setDisplay(SINGLE_TEXT)}>
                Single Text Analysis
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setDisplay(MULTI_TEXT)}>
                Multi Text Analysis
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setDisplay(PLAGIARISM_TEXT)}>
                Plagiarism Analysis
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Speech Analysis" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => setDisplay(SPEECH_ANALYSIS)}>
                Speech Analysis
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Stopword Analysis
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {display === SINGLE_TEXT && <SingleText></SingleText>}
      {display === MULTI_TEXT && <MultiText></MultiText>}
      {display === PLAGIARISM_TEXT && <TwoTxtSent></TwoTxtSent>}
    </div>
  );
}

export default App;
