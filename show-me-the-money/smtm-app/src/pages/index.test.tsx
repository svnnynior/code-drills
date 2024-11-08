import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home Page", () => {
  it("renders a heading with the correct text", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent("💰 Show Me The Money 💰");
  });

  it("renders a link to the balance sheet page", () => {
    render(<Home />);

    const link = screen.getByRole("link", { name: "View Balance Sheet" });

    expect(link).toHaveAttribute("href", "/balance-sheet");
  });
});
