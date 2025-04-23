import { render, screen } from "@testing-library/react";
import CountryCard from "../CountryCard";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const mockCountry = {
  cca3: "IND",
  name: { common: "India" },
  capital: ["New Delhi"],
  region: "Asia",
  population: 1393409038,
  flags: { png: "https://flagcdn.com/w320/in.png" },
  languages: { eng: "English" },
};

test("renders country card with name and population", () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ user: { username: "test" } }}>
        <CountryCard country={mockCountry} />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(screen.getByText(/India/)).toBeInTheDocument();
  expect(screen.getByText(/New Delhi/)).toBeInTheDocument();
  expect(screen.getByText(/Asia/)).toBeInTheDocument();
});
