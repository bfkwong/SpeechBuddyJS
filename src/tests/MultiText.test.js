//Daniel Tisdale

import React from "react";
import { render } from "@testing-library/react";
import MultiText from "../components/MultiText/MultiText";
import renderer from "react-test-renderer";
import { unmountComponentAtNode } from "react-dom";

describe("MultiText Component", () => {
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

  test("MultiText renders without failure", () => {
    render(<MultiText />, container);
  });

  test("MultiText snapshot test", () => {
    const appTree = renderer.create(<MultiText />).toJSON();
    expect(appTree).toMatchSnapshot();
  });
});
