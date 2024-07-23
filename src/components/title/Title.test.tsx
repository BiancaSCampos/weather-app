import { ClassAttributes, HTMLAttributes } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Title from "./Title";
import React from "react";

// Mock the Lottie component
jest.mock("react-lottie", () => {
  return function DummyLottie(
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLDivElement> &
      HTMLAttributes<HTMLDivElement>
  ) {
    return <div data-testid="lottie-animation" {...props} />;
  };
});

describe("Title Component", () => {
  test("renders the Lottie animation and text correctly", () => {
    const { getByTestId, getByText } = render(<Title />);

    const lottieElement = getByTestId("lottie-animation");
    expect(lottieElement).toBeInTheDocument();

    const textElement = getByText("Previsão do Tempo");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass(
      "text-[2rem] font-poppins font-normal text-white"
    );
  });
});
