import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import SingleText from "../src/components/SingleText/SingleText";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it();
