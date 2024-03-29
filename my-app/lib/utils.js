import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertToIndianNumberSystem = (num) => {
  if (!num) return 0;
  const inputStr = num ? num.toString() : "0";
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

export function calculatePercentage(part, whole) {
  // Calculate the percentage
  let percentage = (part / whole) * 100;

  // Round to two decimal places
  percentage = Math.round(percentage * 100) / 100;

  return percentage;
}

export function percentWithoutDecimal(a, b) {
  return Math.floor((a / b) * 100);
}

export function calculateDaysBetweenDates(date1, date2) {
  // Convert date strings to Date objects
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Calculate the time difference in milliseconds
  const timeDifference = endDate - startDate;

  // Calculate the number of days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
