import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this import is present
import { TodoFilters } from "../TodoFilters";

describe("TodoFilters", () => {
  it("renders the filters", () => {
    render(
      <TodoFilters
        filter="all"
        onFilterChange={jest.fn()}
        sortOrder="asc"
        onSortChange={jest.fn()}
      />
    );

    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("calls onFilterChange when filter is changed", () => {
    const onFilterChange = jest.fn();
    render(
      <TodoFilters
        filter="all"
        onFilterChange={onFilterChange}
        sortOrder="asc"
        onSortChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("All"));
    fireEvent.click(screen.getByText("Active"));
    expect(onFilterChange).toHaveBeenCalledWith("active");
  });

  // Add more tests as needed
});
