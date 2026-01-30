import type { ApiResponse } from '../../api/types';
import MonthCell from './MonthCell';

type TotalItem = NonNullable<ApiResponse['data']['total']>[number];

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
      <tr className="h-[48px]">
        <td rowSpan={2} className="w-[180px] border border-border px-4 align-middle font-medium text-brand-900 py-0">Manager</td>
        <td className="w-[160px] border border-border px-4 text-xs font-medium text-brand-700 leading-none py-0">Total income:</td>
        {total.map((item, i) => (
          item === null ? (
            <td key={`income-${i}`} colSpan={2} rowSpan={2} className="border border-border px-4 text-[12px] text-muted-500 py-0 leading-none text-left">No data</td>
          ) : (
            <MonthCell
              key={`income-${i}`}
              plan={item.plan.income}
              fact={item.fact.income}
              variant="merged"
              rowPosition="top"
              isMoney
            />
          )
        ))}
        {withActions && <td rowSpan={2} className="w-[48px] border border-border px-4 align-middle py-0"></td>}
      </tr>
      <tr className="h-[48px]">
        <td className="w-[160px] border border-border px-4 text-xs font-medium text-brand-700 leading-none py-0">Total active partners:</td>
        {total.map((item, i) => (
          item === null ? null : (
            <MonthCell
              key={`partners-${i}`}
              plan={item.plan.activePartners}
              fact={item.fact.activePartners}
              variant="merged"
              rowPosition="bottom"
            />
          )
        ))}
      </tr>
    </>
  );
}
