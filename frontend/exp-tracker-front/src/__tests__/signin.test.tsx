import { render, screen } from "@testing-library/react";
import '@jest/globals';
import userEvent from "@testing-library/user-event";
import SignIn from "../pages/SignIn/signin"; 
import "@testing-library/jest-dom";

describe("SignIn Form", () => {
  test("renders sign-in form correctly, fields and submit button exist", () => {

    render(<SignIn />);
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    
  });

  test("input validation errors for empty fields are displayed", async () => {

    render(<SignIn />);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));  //no input and submit button click triggered
    expect(await screen.findByText("Email is required")).toBeInTheDocument();  //err messages
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();

  });

  test("input validation errors for invalid email and password are displayed", async () => {

    render(<SignIn />);
    await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "invalid@email");
    await userEvent.type(screen.getByLabelText(/password/i), "123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();
    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();

  });

  test("form submits successfully with valid inputs", async () => {

    render(<SignIn />);
    await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "testing@email.com");
    await userEvent.type(screen.getByLabelText(/password/i), "123456");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.queryByText("Invalid email format")).not.toBeInTheDocument();
    expect(screen.queryByText("Password must be at least 6 characters")).not.toBeInTheDocument();

  });
});
