import React from "react";
import { render } from "@testing-library/react";
import { TodoSkeleton } from "../TodoSkeleton";

describe("TodoSkeleton", () => {
  it("renders the skeleton loader", () => {
    const { container } = render(<TodoSkeleton />);
    expect(
      container.getElementsByClassName("animate-pulse").length
    ).toBeGreaterThan(0);
  });

  // Add more tests as needed
});
