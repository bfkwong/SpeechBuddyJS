import React from "react";
import { render } from "@testing-library/react";
import SingleTextAnalysis from "../components/SingleTextAnalysis/SingleTextAnalysis";
import renderer from "react-test-renderer";
import { unmountComponentAtNode } from "react-dom";

describe("SingleTextAnalysis Component", () => {
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

  test("SingleTextAnalysisComponent renders without failure", () => {
    render(<SingleTextAnalysis />, container);
  });

  test("SingleTextAnalysisComponent snapshot test", () => {
    const appTree = renderer.create(<SingleTextAnalysis />).toJSON();
    expect(appTree).toMatchSnapshot();
  });
});
