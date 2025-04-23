import { render, screen, fireEvent } from "@testing-library/react";
import LanguageFilter from "../LanguageFilter";

test("calls onChange when a language is selected", () => {
  const mockChange = vi.fn();

  render(<LanguageFilter selectedLanguage="" onChange={mockChange} />);

  const select = screen.getByLabelText(/filter by language/i);
  fireEvent.change(select, { target: { value: "English" } });

  expect(mockChange).toHaveBeenCalledWith("English");
});
