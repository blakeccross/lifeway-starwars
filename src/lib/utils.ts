import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseIdFromString(url: string) {
  let match = url.match(/(\d+)(?!.*\d)/);
  if (match) {
    let lastNumber = match[1];
    return lastNumber;
  } else {
    return "1";
  }
}
