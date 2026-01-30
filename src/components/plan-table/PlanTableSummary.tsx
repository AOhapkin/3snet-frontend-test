import type { ApiResponse } from '../../api/types';
import MonthCell from './MonthCell';

type TotalItem = ApiResponse['data']['total'][number];

interface PlanTableSummaryProps {
  total: (TotalItem | null)[];
  withActions?: boolean;
}

export default function PlanTableSummary({
  total,
  withActions = true,
}: PlanTableSummaryProps) {
  return (
    <>
      <tr>
        <td rowSpan={2}>Manager</td>
        <td>Total income:</td>
        {total.map((item, i) => (
          <MonthCell
            key={`income-${i}`}
            plan={item?.plan.income ?? null}
            fact={item?.fact.income ?? null}
          />
        ))}
        {withActions && <td rowSpan={2}></td>}
      </tr>
      <tr>
        <td>Total active partners:</td>
        {total.map((item, i) => (
          <MonthCell
            key={`partners-${i}`}
            plan={item?.plan.activePartners ?? null}
            fact={item?.fact.activePartners ?? null}
          />
        ))}
      </tr>
    </>
  );
}
