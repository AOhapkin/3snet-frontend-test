export type MetricKey = "income" | "activePartners";
export type TableCell = {
  plan: number;
  fact: number;
};

export type TableRowModel = {
  id: string;
  title: string;
  cellsByMonth: Record<number, Record<MetricKey, TableCell>>;
};

export type TableModel = {
  months: number[];
  rows: TableRowModel[];
};