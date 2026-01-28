import type { ApiData, MonthMetrics } from "../api/types";
import type { MetricKey, TableCell, TableModel, TableRowModel } from "./tableModel";

function toCell(m: MonthMetrics | null, metric: MetricKey): TableCell {
  if (!m) return { plan: 0, fact: 0 };
  return {
    plan: m.plan[metric] ?? 0,
    fact: m.fact[metric] ?? 0,
  };
}

export function buildTableModel(data: ApiData, months: number[]): TableModel {
  const rows: TableRowModel[] = data.table.map((row) => {
    const cellsByMonth: TableRowModel["cellsByMonth"] = {};

    months.forEach((monthIndex) => {
      const monthData = row.months[monthIndex] ?? null;

      cellsByMonth[monthIndex] = {
        income: toCell(monthData, "income"),
        activePartners: toCell(monthData, "activePartners"),
      };
    });

    return {
      id: String(row.id),
      title: row.adminName,
      cellsByMonth,
    };
  });

  return { months, rows };
}