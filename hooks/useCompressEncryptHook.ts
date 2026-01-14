import * as compressor from "lz-string";
import CryptoJS from "crypto-js";



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

    // generate auto key
    const autoKeyGen = AutoKeyGenerator()

    // encrypt auto key & save into local storage
    const encryptedAutoKey = Encryptor(autoKeyGen)
    localStorage.setItem('encryptedAutoKey', encryptedAutoKey)

    // encrypt message & save into local storage
    const encryptedMessage = Encryptor(compressedData)
    localStorage.setItem('encryptedMessage', encryptedMessage)

    // get encrypted msg size and save into local storage
    const originalEncryptedMsgSize = getByteSize(encryptedMessage);
    const compressedEncryptedMsgSize = Math.ceil(
      originalEncryptedMsgSize - (originalEncryptedMsgSize / 1.1)
    );
    localStorage.setItem('encryptedMsgSize', JSON.stringify(compressedEncryptedMsgSize))

    // get encrypted key size and save into local storage
    const originalEncryptedKeySize = getByteSize(encryptedAutoKey);
    const compressedEncryptedKeySize = Math.ceil(
      originalEncryptedKeySize - (originalEncryptedKeySize / 1.1)
    );
    localStorage.setItem('encryptedKeySize', JSON.stringify(compressedEncryptedKeySize))

     // decrypt auto key & save into local storage
    // const encAutoKey = JSON.stringify(localStorage.getItem('encryptedAutoKey'))
    const decryptedAutoKey : string = Decryptor(encryptedAutoKey)
    localStorage.setItem('decryptedAutoKey', decryptedAutoKey)

    // decrypt message & save into local storage
    // const encMsg = JSON.stringify(localStorage.getItem('encryptedMessage'))
    const decryptedMessage : string = Decryptor(encryptedMessage)
    localStorage.setItem('decryptedMessage', decryptedMessage)

    // save into local storage
    localStorage.setItem('compressedData', compressedData)
    localStorage.setItem('compressedByteSize', JSON.stringify(compressedByteSize))
    localStorage.setItem('originalData', originalData)
    localStorage.setItem('originalByteSize', JSON.stringify(originalByteSize))

    // return compressed data and sizes
    return { compressedData };
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

    // decrypt auto key & save into local storage
    const encAutoKey = JSON.stringify(localStorage.getItem('encryptedAutoKey'))
    const decryptedAutoKey : string = Decryptor(encAutoKey)
    localStorage.setItem('decryptedAutoKey', decryptedAutoKey)

    // decrypt message & save into local storage
    const encMsg = JSON.stringify(localStorage.getItem('encryptedMessage'))
    const decryptedMessage : string = Decryptor(encMsg)
    localStorage.setItem('decryptedMessage', decryptedMessage)


    // save into local storage
    localStorage.setItem('decompressedData', decompressedData)
    localStorage.setItem('decompressedByteSize', JSON.stringify(decompressedByteSize))

    return { decryptedAutoKey, decryptedMessage };
  };

  // Convert to byte array
  function getByteSize(data: string) {
    const encoder = new TextEncoder(); // UTF-8 encoder
    const byteArray = encoder.encode(data);
    return byteArray.length;
  }

  // encrypt the compressed data here
  const Encryptor = (data: string) => {

    const autoKey: string  = JSON.stringify(localStorage.getItem('autoKeyGen'))

    // Placeholder for encryption logic
    const encryptMessage = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      autoKey
    ).toString();

    // return encrypted message
    return encryptMessage;
  };

  // decrypt the encrypted data here later
  const Decryptor = (data: string) => {

    const autoKey: string  = JSON.stringify(localStorage.getItem('autoKeyGen'))

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

    // combine all characters
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
    const autoKeyGen = result
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    // save auto key gen
    localStorage.setItem('autoKeyGen', autoKeyGen)

    // return key
    return autoKeyGen
  }

  // Encrypted message size
  const EncryptedMessageSize = (encryptedMsg: string) => {
    const encMsgSize = getByteSize(encryptedMsg)

    // save encrypted msg size
    localStorage.setItem('encMsgSize', JSON.stringify(encMsgSize))

    // return encrypted msg size
    return { encMsgSize }
  }

  // encrypted key size
  const EncryptedKeySize = (encryptedKey: string) => {
    const encKeySize = getByteSize(encryptedKey)

    // save encrypted key size
    localStorage.setItem('encKeySize', JSON.stringify(encKeySize))

    // return key size
    return { encKeySize }
  }


  // return all functions
  return {
    Compressor,
    Decompressor,
    Encryptor,
    Decryptor,
    AutoKeyGenerator,
    EncryptedMessageSize,
    EncryptedKeySize
  };
}
