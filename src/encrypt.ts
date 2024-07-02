import { publicEncrypt, randomBytes, createCipheriv, constants } from "crypto";

export interface EncryptedData {
  encrypted: string;
  encryptedKey: string;
  iv: string;
}

export function encrypt(text: string, publicKey: string): EncryptedData | null {
  try {
    const aesKey = randomBytes(32);
    const iv = randomBytes(16);

    const cipher = createCipheriv("aes-256-cbc", aesKey, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");

    const encryptedKey = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      aesKey
    ).toString("hex");

    return { encrypted, encryptedKey, iv: iv.toString("hex") };
  } catch (error) {
    console.log("Error encrypting");
    return null;
  }
}
