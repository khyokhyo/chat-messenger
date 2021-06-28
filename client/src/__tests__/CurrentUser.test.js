import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { CurrentUser } from "../components/Sidebar/CurrentUser";

afterEach(cleanup);

const dummyUser = {
  username: "thomas",
};

test("CurrentUser component renders without crashing", () => {
  render(<CurrentUser />);
});

test("Current user name displays correctly", () => {
  render(<CurrentUser user={dummyUser} />);

  expect(screen.getByTestId("user-name").textContent).toBe("thomas");
});
