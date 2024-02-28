import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertToIndianNumberSystem = (num) => {
  const inputStr = num.toString();
  const [numStr, decimal] = inputStr.split(".");

  const formattedDecimal = decimal ? `.${decimal.substring(0, 2)}` : "";

  const croreRegex = /^(\d+)(\d{2})(\d{2})(\d{3})$/;
  const lakhRegex = /^(\d{1,2})(\d{2})(\d{3})$/;
  const thousandRegex = /^(\d{1,2})(\d{3})$/;

  let match;

  if (croreRegex.test(numStr)) {
    match = numStr.match(croreRegex);
    return `${match.join(",")}${formattedDecimal}`;
  }
  if (lakhRegex.test(numStr)) {
    match = numStr.match(lakhRegex);
    match.shift();
    return `${match.join(",")}${formattedDecimal}`;
  }

  // Step 6: If not matched with the lakh pattern, try matching with the thousand pattern
  if (thousandRegex.test(numStr)) {
    match = numStr.match(thousandRegex);
    match.shift(); // Remove the first element (entire matched string)
    return `${match.join(",")}${formattedDecimal}`;
  }

  // Step 7: If no pattern matches, return the original number with decimal (if present)
  return `${numStr}${formattedDecimal}`;
};
