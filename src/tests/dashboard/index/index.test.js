import React from "react";
import { render } from "@testing-library/react";
import App from "../../../App";
import UserService from "../../../components/services/UserService";

describe("Index", () => {
  it("should call UserService.init and render App component", () => {
    const userServiceMock = jest.spyOn(UserService, "init");
    UserService.init();
    const { container } = render(<App />);
    expect(userServiceMock).toHaveBeenCalled();
    expect(container.innerHTML).toContain("<div>");
    expect(container.innerHTML).toContain("</div>");
  });
});
