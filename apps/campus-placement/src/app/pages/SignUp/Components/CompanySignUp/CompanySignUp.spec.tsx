import { render } from "@testing-library/react";

import CompanySignUp from "./CompanySignUp";

describe("CompanySignUp", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CompanySignUp />);
    expect(baseElement).toBeTruthy();
  });
});
