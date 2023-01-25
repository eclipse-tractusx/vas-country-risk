import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import DetailDialog from "../../../components/dashboard/DetailDialog/DetailDialog";

const row = [
  {
    id: 1,
    bpn: "BPN-NUMBER",
    legalName: "Divape Company",
    address: "15874 Sutteridge Trail",
    city: "Covilhã",
    country: "Portugal",
    score: 10,
    rating: "Fake Rating",
    longitude: "107.6185727",
    latitude: "-6.6889038",
  },
];

test("DetailDialog Test", async () => {
  await act(async () => {
    render(
      <DetailDialog
        selectedDetailRow={row}
        onCloseDetailGridFunction={jest.fn()}
      />
    );
  });
});
