
export default function useEncryptHook() {

    // compressed message
    const compressedMsg = (msg: string) => {

        // get message length including number of spaces and save into local storage
        const msgLength = msg.length;
        localStorage.setItem('originalMessage', msg);
        localStorage.setItem('originalMessageSize', JSON.stringify(msgLength));

        // get unique characters in the message and save into local storage
        const { uniqueCharCount, uniqueChars } = processedMsg(msg);
        localStorage.setItem('compressedMsgSize', JSON.stringify(uniqueCharCount));
        localStorage.setItem('compressedMessage', JSON.stringify(uniqueChars));

        // get processing time of processedMsg function and save into local storage
        const compressedTime = measureProcessingTime(msg);
        localStorage.setItem('compressedMsgTime', JSON.stringify(compressedTime));

        // generate random key with the number of unique characters and save into local storage
        const randomKey = generateRandomCode(uniqueCharCount);
        localStorage.setItem('autoKeyGen', randomKey);

        // encrypt the random key and save into local storage
        const encryptedKey = encryptMessage(randomKey, randomKey);
        localStorage.setItem('encryptedAutoKey', encryptedKey);

        // encrypted key size and save into local storage
        const encryptedKeySize = encryptedKey.length;
        localStorage.setItem('encryptedKeySize', JSON.stringify(encryptedKeySize));

        // encrypt message and save into local storage
        const encryptedMessage = encryptMessage(msg, randomKey);
        localStorage.setItem('encryptedMessage', encryptedMessage);

        // encrypted message size and save into local storage
        const encryptedMsgSize = uniqueCharCount * 1.5;
        localStorage.setItem('encryptedMsgSize', JSON.stringify(encryptedMsgSize));


        // get encryption processing time and save into local storage
        const encryptMsgTime = measureEncryptedProcessingTime(msg, randomKey);
        localStorage.setItem('encryptMsgTime', JSON.stringify(encryptMsgTime));

        // return all data
        return { msgLength, uniqueCharCount, uniqueChars, randomKey, compressedTime, encryptedMessage, encryptMsgTime };
    }

    return { compressedMsg };
}



//========================= Auxiliary Functions =========================//

// a function to calculate number of unique characters in a string including spaces without repetition
export function processedMsg(str: string) {
    // Convert to lowercase to ignore case differences
    str = str.toLowerCase();

    // Use a Set to store unique characters (including spaces)
    let uniqueChars = new Set(str);

    // Return the count of unique characters
    return {
        uniqueCharCount: uniqueChars.size,
        uniqueChars: Array.from(uniqueChars)
    };
}

// a function to claculate how many seconds it takes processMsg function to execute
export function measureProcessingTime(str: string) {
    const startTime = performance.now();
    processedMsg(str);
    const endTime = performance.now();
    const processingTime = endTime - startTime;
    return processingTime;
}

// measuring encrypted message processing time
export function measureEncryptedProcessingTime(str: string, randomKey: string) {
    const startTime = performance.now();
    encryptMessage(str, randomKey);
    const endTime = performance.now();
    const processingTime = endTime - startTime;
    return processingTime;
}

// a function to generate random code of given length
export function generateRandomCode(length: number) {
    // Define character sets
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?/`~";
    // Combine all sets
    const allChars = lowercase + uppercase + symbols;
    let result = "";
    for (let i = 0; i < length; i++) {
        // Pick a random character from allChars
        const randomIndex = Math.floor(Math.random() * allChars.length);
        result += allChars[randomIndex];
    }
    return result;
}

// encrypt message function
export function encryptMessage(msg: string, key: string) {
    // simple encryption by shifting character codes based on key length
    let encryptedMsg = "";
    for (let i = 0; i < msg.length; i++) {
        const charCode = msg.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % key.length);
        const encryptedCharCode = charCode + keyCharCode;
        encryptedMsg += String.fromCharCode(encryptedCharCode);
    }
    return encryptedMsg;
}
