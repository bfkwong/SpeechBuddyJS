import React from "react";
import { render } from "@testing-library/react";
import TwoTxtSent from "../components/TwoTxtSent/TwoTxtSent";
import renderer from "react-test-renderer";
import { unmountComponentAtNode } from "react-dom";

describe("TwoTxtSent Component", () => {
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

  test("TwoTxtSent renders without failure", () => {
    render(<TwoTxtSent />, container);
  });

  test("TwoTxtSent snapshot test", () => {
    const appTree = renderer.create(<TwoTxtSent />).toJSON();
    expect(appTree).toMatchSnapshot();
  });
});
