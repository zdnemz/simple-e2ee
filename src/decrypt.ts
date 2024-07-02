import { privateDecrypt, createDecipheriv, constants } from "crypto";

export function decrypt(
  text: string,
  encryptedKey: string,
  iv: string,
  privateKey: string
): string | null {
  try {
    const aesKey = privateDecrypt(
      {
        key: privateKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(encryptedKey, "hex")
    );

    const decipher = createDecipheriv(
      "aes-256-cbc",
      aesKey,
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(text, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
  } catch (error) {
    console.log("Error decrypting");
    return null;
  }
}
