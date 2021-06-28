import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Login } from "../Signup";

afterEach(cleanup);

test("Signup page renders without crashing", () => {
  render(<Login user={{}} />);
});

test("Input fields in signup page renders properly", () => {
  render(<Login user={{}} />);

  expect(screen.getByTestId("username")).toBeTruthy();
  expect(screen.getByTestId("email")).toBeTruthy();
  expect(screen.getByTestId("password")).toBeTruthy();
  expect(screen.getByTestId("confirm-password")).toBeTruthy();
});
