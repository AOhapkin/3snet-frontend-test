export type ApiResponse = {
  success: boolean;
  data: ApiData;
};

export type ApiData = {
  total?: Array<{
    plan: MetricPair;
    fact: MetricPair;
  }>;
  table: AdminRow[];
};

export type MetricPair = {
  income: number;
  activePartners: number;
};

export type MonthMetrics = {
  income: number;
  activePartners: number;
  plan: MetricPair;
  fact: MetricPair;
};

export type AdminRow = {
  id: number;
  adminId: number;
  adminName: string;
  months: Array<MonthMetrics | null>;
  year: number;
};