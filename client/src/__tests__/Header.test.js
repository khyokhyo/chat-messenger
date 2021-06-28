import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import Header from "../components/ActiveChat/Header";

afterEach(cleanup);

test("Headeer of Active Chat renders without crashing", () => {
  render(<Header />);
});

test("Other user name displays correctly", () => {
  render(<Header username="test" />);

  expect(screen.getByTestId("username").textContent).toBe("test");
  expect(screen.getByTestId("username").textContent).not.toBe("thomas");
});
