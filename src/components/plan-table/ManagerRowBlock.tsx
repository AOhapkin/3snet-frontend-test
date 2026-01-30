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
      <tr>
        <td rowSpan={2}>{managerName}</td>
        <td>Income:</td>
        {months.map((month, index) => (
          <MonthCell
            key={`income-${index}`}
            plan={month ? month.plan.income : null}
            fact={month ? month.fact.income : null}
          />
        ))}
        {withActions && <td rowSpan={2}>...</td>}
      </tr>
      <tr>
        <td>Active partners:</td>
        {months.map((month, index) => (
          <MonthCell
            key={`partners-${index}`}
            plan={month ? month.plan.activePartners : null}
            fact={month ? month.fact.activePartners : null}
          />
        ))}
      </tr>
    </>
  );
}
