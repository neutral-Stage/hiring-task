import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToastProvider, useToast } from "../ToastProvider";

describe("ToastProvider", () => {
  const TestComponent = () => {
    const addToast = useToast();
    return (
      <button
        onClick={() =>
          addToast({
            title: "Test Toast",
            description: "This is a test toast",
          })
        }
      >
        Show Toast
      </button>
    );
  };

  it("shows a toast", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText("Show Toast"));

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
    expect(screen.getByText("This is a test toast")).toBeInTheDocument();
  });
});
