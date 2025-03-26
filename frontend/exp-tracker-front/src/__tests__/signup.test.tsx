import { render, screen } from "@testing-library/react";
import '@jest/globals';
import userEvent from "@testing-library/user-event";
import SignUp from "../pages/SignUp/signup"; 
import "@testing-library/jest-dom";

describe("SignUp Form", () => {
  test("renders sign-up form correctly, fields and submit button exist", () => {

    render(<SignUp />);
    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    
  });

  test("input validation errors for empty fields are displayed", async () => {

    render(<SignUp />);
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));  //no input and submit button click triggered
    expect(await screen.findByText("Name must be at least 2 characters")).toBeInTheDocument();  //err messages
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Confirm Password is required")).toBeInTheDocument();
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();

  });

  test("input validation errors for invalid name, email and passwords are displayed", async () => {

    render(<SignUp />);
    await userEvent.type(screen.getByRole("textbox", { name: /name/i }), "a");
    await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "invalid@email");
    await userEvent.type(screen.getByLabelText("Password"), "123");
    await userEvent.type(screen.getByLabelText("Confirm Password"), "1");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findByText("Name must be at least 2 characters")).toBeInTheDocument();
    expect(await screen.findByText("Confirm Password is required")).toBeInTheDocument();
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();
    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();

  });

  test("input validation errors for password and confirm password are displayed", async () => {
    render(<SignUp />);
    await userEvent.type(screen.getByLabelText("Password"), "123456");
    await userEvent.type(screen.getByLabelText("Confirm Password"), "1234567");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.queryByText("Passwords do not match")).toBeInTheDocument();

  });

  test("form submits successfully with valid inputs", async () => {

    render(<SignUp />);
    await userEvent.type(screen.getByRole("textbox", { name: /name/i }), "abcd");
    await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "testing@email.com");
    await userEvent.type(screen.getByLabelText("Password"), "123456");
    await userEvent.type(screen.getByLabelText("Confirm Password"), "123456");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.queryByText("Name must be at least 2 characters")).not.toBeInTheDocument();
    expect(screen.queryByText("Invalid email format")).not.toBeInTheDocument();
    expect(screen.queryByText("Confirm Password is required")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be at least 6 characters")).not.toBeInTheDocument();

  });
});
