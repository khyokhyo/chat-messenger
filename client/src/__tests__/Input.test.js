import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { Input } from "../components/ActiveChat/Input";

afterEach(cleanup);

test("Message input component renders without crashing", () => {
  render(<Input classes={{}} />);
});

test("Message input field takes input correctly", () => {
  render(<Input classes={{}} />);

  const inputNode = screen.getByPlaceholderText("Type something...");

  fireEvent.change(inputNode, { target: { value: "" } });
  expect(inputNode.value).toBe("");

  fireEvent.change(inputNode, { target: { value: "abc 123" } });
  expect(inputNode.value).toBe("abc 123");
  expect(inputNode.value).not.toBe("abc123");
});
