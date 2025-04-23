import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

test("logs out and clears user session", () => {
  localStorage.setItem("loggedInUser", JSON.stringify({ username: "admin" }));

  const mockLogout = vi.fn();
  render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ user: { username: "admin" }, logout: mockLogout }}
      >
        <Navbar />
      </UserContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: /logout/i }));
  expect(mockLogout).toHaveBeenCalled();
});
