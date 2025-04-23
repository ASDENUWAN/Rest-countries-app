import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../api/countries";
import { UserContext } from "../../context/UserContext"; // ✅ Import this

const mockCountries = [
  {
    cca3: "IND",
    name: { common: "India" },
    capital: ["New Delhi"],
    region: "Asia",
    population: 1393409038,
    flags: { png: "https://flagcdn.com/w320/in.png" },
    languages: { eng: "English" },
  },
  {
    cca3: "FRA",
    name: { common: "France" },
    capital: ["Paris"],
    region: "Europe",
    population: 67000000,
    flags: { png: "https://flagcdn.com/w320/fr.png" },
    languages: { fra: "French" },
  },
];

// ✅ Use vi.spyOn instead of jest.spyOn
vi.spyOn(api, "getAllCountries").mockResolvedValue(mockCountries);

test("renders countries and filters by region and language", async () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ user: { username: "testuser" } }}>
        {" "}
        {/* ✅ Fix here */}
        <Home />
      </UserContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => expect(screen.getByText(/India/)).toBeInTheDocument());

  fireEvent.change(screen.getByLabelText(/filter by region/i), {
    target: { value: "Asia" },
  });
  expect(screen.getByText(/India/)).toBeInTheDocument();
  expect(screen.queryByText(/France/)).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/filter by language/i), {
    target: { value: "English" },
  });
  expect(screen.getByText(/India/)).toBeInTheDocument();
});
