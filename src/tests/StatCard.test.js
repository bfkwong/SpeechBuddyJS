//Bryan Kwong

import React from "react";
import { render } from "@testing-library/react";
import StatCard from "../components/StatCard/StatCard";
import renderer from "react-test-renderer";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

describe("StatCard Component", () => {
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

  test("StatCard renders without failure", () => {
    render(<StatCard />, container);
  });

  test("StatCard snapshot test", () => {
    const appTree = renderer.create(<StatCard />).toJSON();
    expect(appTree).toMatchSnapshot();
  });

  test("StatCard snapshot test", () => {
    const appTree = renderer
      .create(<StatCard value={100} description={"Test"} />)
      .toJSON();
    expect(appTree).toMatchSnapshot();
  });

  test("StatCard value and description", () => {
    act(() => {
      render(<StatCard value={100} description={"Test"} />, container);
    });

    const SC_value = document.querySelector("[data-testid=SC_value]");
    expect(SC_value.innerHTML).toBe("100");

    const SC_description = document.querySelector(
      "[data-testid=SC_description]"
    );
    expect(SC_description.innerHTML).toBe("Test");
  });
});
