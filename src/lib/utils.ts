import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function inquiryHref(category?: string) {
  return category
    ? `/custom-orders?dessert=${encodeURIComponent(category)}`
    : "/custom-orders";
}
