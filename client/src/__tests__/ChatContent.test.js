import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import ChatContent from "../components/Sidebar/ChatContent";

afterEach(cleanup);

const dummyUser = {
  username: "thomas",
};

test("ChatContent renders without crashing", () => {
  render(<ChatContent conversation={{ otherUser: dummyUser }} />);
});

test("ChatContent displays user name correctly", () => {
  render(<ChatContent conversation={{ otherUser: dummyUser }} />);

  expect(screen.getByTestId("username").textContent).toBe("thomas");
  expect(screen.getByTestId("username").textContent).not.toBe("test");
});
