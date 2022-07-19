import React from "react";
import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe('Application Tests', () => {
  it("defaults to Monday and cahnges the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText('Monday'));
  }); 
}) 

 