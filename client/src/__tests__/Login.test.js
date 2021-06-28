import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Login } from "../Login";

afterEach(cleanup);

test("Login page renders without crashing", () => {
  render(<Login user={{}} />);
});

test("Input fields in login page renders properly", () => {
  render(<Login user={{}} />);

  expect(screen.getByTestId("user-name")).toBeTruthy();
  expect(screen.getByTestId("password")).toBeTruthy();
});
