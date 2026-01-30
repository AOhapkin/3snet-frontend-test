import type { MonthMetrics } from '../../api/types';
import MonthCell from './MonthCell';

interface ManagerRowBlockProps {
  managerName: string;
  months: (MonthMetrics | null)[];
  withActions?: boolean;
}

export default function ManagerRowBlock({
  managerName,
  months = [],
  withActions = true,
}: ManagerRowBlockProps) {
  return (
    <>
      <tr className="h-[48px]">
        <td rowSpan={2} className="w-[180px] border border-border px-4 align-middle font-medium text-brand-900 py-0">{managerName}</td>
        <td className="w-[160px] border border-border px-4 text-xs text-muted-500 leading-none py-0">Income:</td>
        {months.map((month, index) => (
          month === null ? (
            <td key={`income-${index}`} colSpan={2} rowSpan={2} className="border border-border px-4 text-[12px] text-muted-500 py-0 leading-none text-left">No data</td>
          ) : (
            <MonthCell
              key={`income-${index}`}
              plan={month.plan.income}
              fact={month.fact.income}
              variant="merged"
              rowPosition="top"
              isMoney
            />
          )
        ))}
        {withActions && <td rowSpan={2} className="w-[48px] border border-border px-4 align-middle py-0">...</td>}
      </tr>
      <tr className="h-[48px]">
        <td className="w-[160px] border border-border px-4 text-xs text-muted-500 leading-none py-0">Active partners:</td>
        {months.map((month, index) => (
          month === null ? null : (
            <MonthCell
              key={`partners-${index}`}
              plan={month.plan.activePartners}
              fact={month.fact.activePartners}
              variant="merged"
              rowPosition="bottom"
            />
          )
        ))}
      </tr>
    </>
  );
}
