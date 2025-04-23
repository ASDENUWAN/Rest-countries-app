import { render, screen, waitFor } from "@testing-library/react";
import Favorites from "../Favorites";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import * as api from "../../api/countries";

const mockIndia = {
  cca3: "IND",
  name: { common: "India" },
  capital: ["New Delhi"],
  region: "Asia",
  population: 1393409038,
  flags: { png: "https://flagcdn.com/w320/in.png" },
  languages: { eng: "English" },
};

beforeEach(() => {
  localStorage.setItem("favorites_testuser", JSON.stringify(["IND"]));
  vi.spyOn(api, "getCountryByCode").mockResolvedValue([mockIndia]);
});

test("displays favorite countries for logged-in user", async () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ user: { username: "testuser" } }}>
        <Favorites />
      </UserContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => expect(screen.getByText(/India/i)).toBeInTheDocument());
});
