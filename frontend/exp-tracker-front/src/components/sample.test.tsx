import { render, screen } from "@testing-library/react";
import Hello from "./sample";
import "@testing-library/jest-dom";

test("renders Hello component", () => {
  render(<Hello />);
  const element = screen.getByText(/Hello, World!/i);
  expect(element).toBeInTheDocument();
});
