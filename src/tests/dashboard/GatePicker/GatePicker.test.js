import { render, act, fireEvent, screen } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import GatePicker from "../../../components/dashboard/GatePicker/GatePicker";
import { getUserBpdmGates } from "../../../components/services/gate-api";
import { CompanyUserProvider } from "../../../contexts/companyuser";

const gates = [
  {
    id: 1,
    gateName: "BMW",
    companyGateValue: "",
  },
  {
    id: 2,
    gateName: "BMW M GmbH",
    companyGateValue: "",
  },
];

jest.mock("../../../components/services/gate-api", () => ({
  getUserBpdmGates: jest.fn(() => gates),
}));

test("Gate Picker Test", async () => {
  getUserBpdmGates.mockImplementation(() => Promise.resolve(gates));

  await act(async () => {
    render(
      <CompanyUserProvider>
        <GatePicker />
      </CompanyUserProvider>
    );
  });
});
