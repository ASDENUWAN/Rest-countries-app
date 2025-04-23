import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

test("calls onChange when typing", () => {
  const mockChange = vi.fn(); // ✅ use vi.fn()
  render(<SearchBar query="" onChange={mockChange} />);
  const input = screen.getByPlaceholderText(/search by country/i);
  fireEvent.change(input, { target: { value: "India" } });
  expect(mockChange).toHaveBeenCalledWith("India");
});
