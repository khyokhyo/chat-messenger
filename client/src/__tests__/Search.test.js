import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { Search } from "../components/Sidebar/Search";

afterEach(cleanup);

test("Search component renders without crashing", () => {
  render(<Search classes={{}} />);
});

test("Search input field takes input correctly", () => {
  render(<Search classes={{}} />);

  const inputNode = screen.getByPlaceholderText("Search");

  fireEvent.change(inputNode, { target: { value: "" } });
  expect(inputNode.value).toBe("");

  fireEvent.change(inputNode, { target: { value: "abc 123" } });
  expect(inputNode.value).toBe("abc 123");
  expect(inputNode.value).not.toBe("abc123");
});
