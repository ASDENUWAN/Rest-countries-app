import { render, screen, fireEvent } from "@testing-library/react";
import RegionFilter from "../RegionFilter";

test("calls onChange when a region is selected", () => {
  const mockChange = vi.fn();

  render(<RegionFilter selectedRegion="" onChange={mockChange} />);

  const select = screen.getByLabelText(/filter by region/i);
  fireEvent.change(select, { target: { value: "Asia" } });

  expect(mockChange).toHaveBeenCalledWith("Asia");
});
