import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../Register";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// 🔧 Mock useNavigate + alert
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  localStorage.clear();
  window.alert = vi.fn(); // mock alert
});

test("does not allow duplicate usernames to register", () => {
  const existingUser = { username: "testuser", password: "abc123" };
  localStorage.setItem("users", JSON.stringify([existingUser]));

  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "newpass123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(window.alert).toHaveBeenCalledWith("Username already exists");
});

test("registers new user and navigates to login", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "newuser" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "newpass123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /register/i }));

  expect(window.alert).toHaveBeenCalledWith("Registration successful!");
  expect(mockNavigate).toHaveBeenCalledWith("/login");
});
