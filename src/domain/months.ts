export const MONTHS_COUNT = 12;

export function getCurrentMonthIndex(now = new Date()): number {
  return now.getMonth();
}

function normalizeMonthIndex(value: number): number {
  return ((value % MONTHS_COUNT) + MONTHS_COUNT) % MONTHS_COUNT;
}

export function shiftMonthIndex(startIndex: number, delta: number): number {
  return normalizeMonthIndex(startIndex + delta);
}

export function getMonthWindow(startIndex: number, size: number): number[] {
  return Array.from({ length: size }, (_, index) =>
    normalizeMonthIndex(startIndex + index)
  );
}

export function formatMonthLabelRu(monthIndex: number): string {
  const date = new Date(2000, monthIndex, 1);
  return new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(date);
}