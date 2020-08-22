//Daniel Tisdale

import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import renderer from "react-test-renderer";
import { unmountComponentAtNode } from "react-dom";

describe("App Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container.hasChildNodes()) {
      unmountComponentAtNode(container);
    }
    container.remove();
    container = null;
  });

  test("App renders without failure", () => {
    render(<App />, container);
  });

  test("App snapshot test", () => {
    const appTree = renderer.create(<App />).toJSON();
    expect(appTree).toMatchSnapshot();
  });
});
