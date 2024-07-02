import { test, expect } from "bun:test";
import { generateKeyPair } from "../src/generate";

test("generateKeyPair", () => {
  const { publicKey, privateKey } = generateKeyPair();
  expect(publicKey).toBeDefined();
  expect(privateKey).toBeDefined();
});
