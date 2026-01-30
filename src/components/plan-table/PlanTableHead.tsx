import { Fragment } from 'react';

interface PlanTableHeadProps {
  months: string[];
  withActions?: boolean;
}

export default function PlanTableHead({ months, withActions = true }: PlanTableHeadProps) {
  return (
    <thead>
      <tr>
        <th></th>
        <th></th>
        {months.map((m) => (
          <th key={m} colSpan={2}>
            {m}
          </th>
        ))}
        {withActions && <th></th>}
      </tr>
      <tr>
        <th></th>
        <th></th>
        {months.map((month) => (
          <Fragment key={month}>
            <th>Plan:</th>
            <th>Fact:</th>
          </Fragment>
        ))}
        {withActions && <th></th>}
      </tr>
    </thead>
  );
}
