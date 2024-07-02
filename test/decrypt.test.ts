import { test, expect } from "bun:test";
import { generateKeyPair } from "../src/generate";
import { encrypt } from "../src/encrypt";
import type { EncryptedData } from "../src/encrypt";
import { decrypt } from "../src/decrypt";

test("decrypt", () => {
  const { publicKey, privateKey } = generateKeyPair();
  const encryptedData: EncryptedData | null = encrypt("hello world", publicKey);
  expect(encryptedData).not.toBeNull();

  if (encryptedData) {
    const { encrypted, encryptedKey, iv } = encryptedData;
    const decrypted: string | null = decrypt(
      encrypted,
      encryptedKey,
      iv,
      privateKey
    );
    expect(decrypted).toEqual("hello world");
  }
});

test("wrong key decrypt", () => {
  const { publicKey, privateKey } = generateKeyPair();
  const encryptedData: EncryptedData | null = encrypt("hello world", publicKey);
  expect(encryptedData).not.toBeNull();

  if (encryptedData) {
    const { encrypted, iv } = encryptedData;
    const wrongKey = Buffer.from("wrong key").toString("hex");
    const decrypted: string | null = decrypt(
      encrypted,
      wrongKey,
      iv,
      privateKey
    );
    expect(decrypted).not.toEqual("hello world");
  }
});
