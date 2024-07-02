import { test, expect } from "bun:test";
import { generateKeyPair } from "../src/generate";
import { encrypt } from "../src/encrypt";
import type { EncryptedData } from "../src/encrypt";

test("encrypt", () => {
  const { publicKey } = generateKeyPair();
  const encryptedData: EncryptedData | null = encrypt("hello world", publicKey);
  expect(encryptedData).not.toBeNull();

  if (encryptedData) {
    const { encrypted, encryptedKey, iv } = encryptedData;
    expect(encrypted).toBeDefined();
    expect(encryptedKey).toBeDefined();
    expect(iv).toBeDefined();
  }
});
