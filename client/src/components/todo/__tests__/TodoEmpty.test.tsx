import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoEmpty } from "../TodoEmpty";

describe("TodoEmpty", () => {
  it("renders the correct message for 'all' filter", () => {
    render(<TodoEmpty onCreateClick={jest.fn()} filter="all" />);
    expect(
      screen.getByText("You don't have any todos yet")
    ).toBeInTheDocument();
  });

  it("renders the correct message for 'active' filter", () => {
    render(<TodoEmpty onCreateClick={jest.fn()} filter="active" />);
    expect(screen.getByText("No active todos found")).toBeInTheDocument();
  });

  it("renders the correct message for 'completed' filter", () => {
    render(<TodoEmpty onCreateClick={jest.fn()} filter="completed" />);
    expect(screen.getByText("No completed todos found")).toBeInTheDocument();
  });

  it("calls onCreateClick when 'Create your first todo' button is clicked", () => {
    const onCreateClick = jest.fn();
    render(<TodoEmpty onCreateClick={onCreateClick} filter="all" />);
    fireEvent.click(screen.getByText("Create your first todo"));
    expect(onCreateClick).toHaveBeenCalled();
  });

  // Add more tests as needed
});
