export type MonthValue = { plan: string; fact: string } | null;

export type RowBlock = {
  managerLabel: string;
  rows: Array<{
    metricLabel: string;
    values: MonthValue[];
  }>;
  hasActions?: boolean;
};
