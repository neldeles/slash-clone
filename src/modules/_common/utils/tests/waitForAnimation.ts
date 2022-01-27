import { act } from "@testing-library/react";

export async function waitForAnimation() {
  await act(() => new Promise((r) => setTimeout(r, 1000)));
}
