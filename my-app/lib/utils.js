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

export function convertDateFormat(inputDate) {
  // Ensure the input is a valid date string
  const inputDateObject = new Date(inputDate);
  if (isNaN(inputDateObject.getTime())) {
    console.error("Invalid date format");
    return null;
  }

  // Define months in abbreviated form
  const monthsAbbreviated = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract day, month, and year
  const day = inputDateObject.getDate();
  const monthAbbreviated = monthsAbbreviated[inputDateObject.getMonth()];
  const year = inputDateObject.getFullYear();

  // Create the new date format
  const formattedDate = `${day}-${monthAbbreviated}-${year}`;

  return formattedDate;
}

// Example usage:
const originalDate = "2024-03-02";
const convertedDate = convertDateFormat(originalDate);

export function getCurrentMonth() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();

  return months[currentMonthIndex];
}
