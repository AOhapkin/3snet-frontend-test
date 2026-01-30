import { Fragment } from 'react';

interface PlanTableHeadProps {
  months: string[];
  withActions?: boolean;
}

export default function PlanTableHead({ months, withActions = true }: PlanTableHeadProps) {
  return (
    <thead className="bg-surface text-muted-500">
      <tr>
        <th className="w-[180px] border border-border border-b-0 px-4 text-left font-medium align-middle py-0 h-[36px]"></th>
        <th className="w-[160px] border border-border border-b-0 px-4 text-left font-medium align-middle py-0 h-[36px]"></th>
        {months.map((m) => (
          <th key={m} colSpan={2} className="border border-border border-b-0 border-r-0 px-4 text-left font-medium text-muted-500 py-0 align-middle text-sm h-[36px]">
            {m}
          </th>
        ))}
        {withActions && <th className="w-[48px] border border-border border-b-0 px-4 text-left font-medium py-0 align-middle h-[36px]"></th>}
      </tr>
      <tr>
        <th className="w-[180px] border border-border border-t-0 px-4 text-left font-medium align-middle py-0 h-[36px]"></th>
        <th className="w-[160px] border border-border border-t-0 px-4 text-left font-medium align-middle py-0 h-[36px]"></th>
        {months.map((month) => (
          <Fragment key={month}>
            <th className="border border-border border-t-0 border-r-0 px-4 text-left font-medium text-muted-500 leading-none py-0 align-middle text-xs h-[36px]">Plan:</th>
            <th className="border border-border border-t-0 border-l-0 px-4 text-left font-medium text-muted-500 leading-none py-0 align-middle text-xs h-[36px]">Fact:</th>
          </Fragment>
        ))}
        {withActions && <th className="w-[48px] border border-border border-t-0 px-4 text-left font-medium py-0 align-middle h-[36px]"></th>}
      </tr>
    </thead>
  );
}
