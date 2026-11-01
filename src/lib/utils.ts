import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function inquiryHref(category?: string) {
  return category
    ? `/custom-orders?dessert=${encodeURIComponent(category)}`
    : "/custom-orders";
}
