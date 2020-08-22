import React from "react";
import { render } from "@testing-library/react";
import SingleText from "../components/SingleText/SingleText";
import renderer from "react-test-renderer";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

describe("SingleText Component", () => {
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

  test("SingleText renders without failure", () => {
    render(<SingleText />, container);
  });

  test("SingleText snapshot test", () => {
    const appTree = renderer.create(<SingleText />).toJSON();
    expect(appTree).toMatchSnapshot();
  });

  test("SingleText Text Field Changes Test", () => {
    let SingleTextComponent = <SingleText />;
    act(() => {
      render(SingleTextComponent, container);
    });

    const SingleTextTA = document.querySelector("[data-testid=SingleTextTA]");
    const SingleTextCLR = document.querySelector("[data-testid=SingleTextCLR]");

    expect(SingleTextTA.placeholder).toBe("Enter your text document here ...");
    expect(SingleTextTA.value).toBe("");

    SingleTextTA.value = "Testing";
    expect(SingleTextTA.value).toBe("Testing");

    SingleTextCLR.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(SingleTextTA.value).toBe("");
  });
});
