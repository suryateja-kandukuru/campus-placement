import { render } from "@testing-library/react";

import CollegeDashboard from "./CollegeDashboard";

describe("CollegeDashboard", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CollegeDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
