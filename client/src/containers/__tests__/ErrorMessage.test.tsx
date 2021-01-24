import { render } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("errorMessage", () => {
  it("should return server side error", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockError: any = {
      graphQLErrors: [
        { extensions: { response: { status: 500, statusText: "an error" } } },
      ],
    };

    const { getByText } = render(<ErrorMessage error={mockError} />);

    expect(getByText(/an error/i)).toBeTruthy();
    expect(getByText("500")).toBeTruthy();
  });

  it("should return client side error", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockError: any = {
      networkError: {
        statusCode: 401,
        message: "an error",
      },
    };

    const { getByText } = render(<ErrorMessage error={mockError} />);

    expect(getByText(/an error/i)).toBeTruthy();
    expect(getByText("401")).toBeTruthy();
  });
});
