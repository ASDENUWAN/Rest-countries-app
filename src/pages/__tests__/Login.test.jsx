import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { sha256 } from "js-sha256"; // ✅ import the hash function

beforeEach(() => {
  localStorage.clear();
  // ✅ store hashed password like the app does
  const hashed = sha256("1234abcd");
  localStorage.setItem(
    "users",
    JSON.stringify([{ username: "admin", password: hashed }])
  );
});

test("logs in successfully with valid credentials", () => {
  const mockLogin = vi.fn();
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ login: mockLogin }}>
        <Login />
      </UserContext.Provider>
    </BrowserRouter>
  );

  // ✅ fill inputs
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "admin" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "1234abcd" },
  });

  // ✅ click login
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // ✅ check login was called with correct user
  expect(mockLogin).toHaveBeenCalledWith({ username: "admin" });
});
