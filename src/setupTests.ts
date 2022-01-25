// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { db } from "mocks/db";
import { drop } from "@mswjs/data";
import { server } from "mocks/server";

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  drop(db);
});

beforeEach(() => {
  drop(db);
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  drop(db);
});
// Clean up after the tests are finished.
afterAll(() => server.close());
