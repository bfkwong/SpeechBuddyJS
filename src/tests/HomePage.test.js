import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import renderer from "react-test-renderer";
import { unmountComponentAtNode } from "react-dom";

describe("HomePage", () => {
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

  test("HomePage renders without failure", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
      container
    );
  });

  test("HomePage snapshot test", () => {
    const appTree = renderer
      .create(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      )
      .toJSON();
    expect(appTree).toMatchSnapshot();
  });
});
