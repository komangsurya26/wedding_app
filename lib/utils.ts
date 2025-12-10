import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIDR(value: number) {
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 60);
}

export function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function addDay(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function formatExpired(date?: string | null) {
  if (!date) return "-";

  // Hilangkan Z agar tidak berubah timezone
  const clean = date.replace("Z", "");

  // Pecah manual
  const [datePart, timePart] = clean.split("T");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");

  const monthName = new Date(clean).toLocaleString("id-ID", { month: "short" });

  // Contoh: 27 Des 2025, 11:52
  return `${day} ${monthName} ${year}, ${hour}:${minute}`;
}

export function formatDate(date?: string | null) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("id", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}