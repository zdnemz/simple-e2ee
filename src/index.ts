import { generateKeyPair } from "./generate";
import { encrypt } from "./encrypt";
import type { EncryptedData } from "./encrypt";
import { decrypt } from "./decrypt";

const { publicKey, privateKey } = generateKeyPair();

const encryptedData: EncryptedData | null = encrypt("hello world", publicKey);

if (encryptedData) {
  const { encrypted, encryptedKey, iv } = encryptedData;

  console.log(`encryptedMessage : ${encrypted}`);
  console.log(`encryptedKey : ${encryptedKey}`);
  console.log(`iv : ${iv}`);

  const decrypted: string | null = decrypt(
    encrypted,
    encryptedKey,
    iv,
    privateKey
  );

  if (decrypted) {
    console.log(decrypted);
  } else {
    console.error("Decryption failed.");
  }
} else {
  console.error("Encryption failed.");
}
