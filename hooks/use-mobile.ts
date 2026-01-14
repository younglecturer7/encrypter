import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// function processedMsg(str) {
//   // Convert to lowercase to ignore case differences
//   str = str.toLowerCase();
  
//   // Use a Set to store unique characters (including spaces)
//   let uniqueChars = new Set(str);
  
//   // Return the count of unique characters
//   return uniqueChars.size;
// }

// // Example usage:
// var fullname = "Adeleke adeyinka ade";
// var result = processedMsg(fullname);
// console.log(result); // Output: ?


// function generateRandomCode(length) {
//   // Define character sets
//   const lowercase = "abcdefghijklmnopqrstuvwxyz";
//   const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   const symbols   = "!@#$%^&*()_+[]{}|;:,.<>?/`~";

//   // Combine all sets
//   const allChars = lowercase + uppercase + symbols;

//   let result = "";
//   for (let i = 0; i < length; i++) {
//     // Pick a random character from allChars
//     const randomIndex = Math.floor(Math.random() * allChars.length);
//     result += allChars[randomIndex];
//   }

//   return result;
// }

// // Example usage:
// console.log(generateRandomCode(12)); // e.g. "aZ@fK!p#Qw$"