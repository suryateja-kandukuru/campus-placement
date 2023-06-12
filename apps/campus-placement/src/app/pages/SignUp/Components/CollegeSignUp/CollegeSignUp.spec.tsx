import { render } from "@testing-library/react";

import CollegeSignUp from "./CollegeSignUp";

describe("CollegeSignUp", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CollegeSignUp />);
    expect(baseElement).toBeTruthy();
  });
});
