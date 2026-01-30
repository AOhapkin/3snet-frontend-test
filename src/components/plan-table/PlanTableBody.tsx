import type { ApiResponse } from '../../api/types';
import PlanTableSummary from './PlanTableSummary';
import ManagerRowBlock from './ManagerRowBlock';

type TotalItem = NonNullable<ApiResponse['data']['total']>[number];

interface PlanTableBodyProps {
  total: (TotalItem | null)[];
  rows: ApiResponse['data']['table'];
}

export default function PlanTableBody({ total, rows }: PlanTableBodyProps) {
  return (
    <tbody>
      <PlanTableSummary total={total} />
      {rows.map((row) => (
        <ManagerRowBlock
          key={row.id}
          managerName={row.adminName}
          months={row.months}
        />
      ))}
    </tbody>
  );
}
