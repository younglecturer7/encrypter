import * as compressor from "lz-string";
import CryptoJS from "crypto-js";

type EncryptData = {
  data: string;
  autoKey: string;
};

export default function useCompressEncryptHook() {

  // compressed data
  const Compressor = (originalData: string) => {

    // Compress the data
    const compressedData = compressor.compressToBase64(originalData);

    // Measure sizes
    const originalByteSize = getByteSize(originalData);
    const compressedByteSize = Math.ceil(
      getByteSize(compressedData) - getByteSize(compressedData) / 1.1
    );

    // return compressed data and sizes
    return { compressedData, originalByteSize, compressedByteSize };
  };

  // decompress data
  const Decompressor = (originalData: string) => {

    // Decompress the data
    const decompressedData = compressor.decompressFromBase64(originalData);

    // Measure sizes
    const originalByteSize = getByteSize(originalData);
    const decompressedByteSize = Math.fround(
      getByteSize(decompressedData) - getByteSize(decompressedData) / 1.1
    );

    return { decompressedData, originalByteSize, decompressedByteSize };
  };

  // Convert to byte array
  function getByteSize(data: string) {
    const encoder = new TextEncoder(); // UTF-8 encoder
    const byteArray = encoder.encode(data);
    return byteArray.length;
  }

  // encrypt the compressed data here later
  const Encryptor = (props: EncryptData) => {
    // Placeholder for encryption logic
    const encryptMessage = CryptoJS.AES.encrypt(
      JSON.stringify(props.data),
      props.autoKey
    ).toString();

    // return encrypted message
    return encryptMessage;
  };

  // decrypt the encrypted data here later
  const Decryptor = (data: string, autoKey: string) => {
    // Placeholder for decryption logic
    const bytes = CryptoJS.AES.decrypt(data, autoKey);
    const decryptedMessage = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // return decrypted data
    return decryptedMessage;
  };

  // auto key generator
  const AutoKeyGenerator = (length = 96) => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()-_=+[]{}|;:,.<>?/`~";

    const allChars = upper + lower + numbers + special;
    let result = "";

    // Ensure at least one of each type
    result += upper[Math.floor(Math.random() * upper.length)];
    result += lower[Math.floor(Math.random() * lower.length)];
    result += numbers[Math.floor(Math.random() * numbers.length)];
    result += special[Math.floor(Math.random() * special.length)];

    // Fill the rest randomly
    for (let i = result.length; i < length; i++) {
      result += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the result to avoid predictable placement
    return result
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
  }


  // rereturn all functions
  return {
    Compressor,
    Decompressor,
    Encryptor,
    Decryptor,
    AutoKeyGenerator,
  };
}
