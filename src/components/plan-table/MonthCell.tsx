function formatMoney(value: number): string {
  return `$ ${value.toLocaleString('ru-RU')}`;
}

interface MonthCellProps {
  plan: number | null;
  fact: number | null;
  variant?: 'split' | 'merged';
  rowPosition?: 'top' | 'bottom';
  isMoney?: boolean;
}

export default function MonthCell({ plan, fact, variant = 'split', rowPosition, isMoney }: MonthCellProps) {
  const borderClasses = variant === 'merged' ? 'border-r-0' : '';
  const borderClassesSecond = variant === 'merged' ? 'border-l-0' : '';
  
  const rowBorderClass = rowPosition === 'top' ? 'border-b-0' : rowPosition === 'bottom' ? 'border-t-0' : '';

  const moneyClass = isMoney ? 'whitespace-nowrap leading-none' : 'leading-none';

  const displayPlan = plan !== null && isMoney ? formatMoney(plan) : plan;
  const displayFact = fact !== null && isMoney ? formatMoney(fact) : fact;

  return (
    <>
      <td className={`border border-border px-4 text-[12px] text-muted-500 py-0 ${moneyClass} ${borderClasses} ${rowBorderClass}`}>{displayPlan}</td>
      <td className={`border border-border px-4 text-[12px] text-muted-500 py-0 ${moneyClass} ${borderClassesSecond} ${rowBorderClass}`}>{displayFact}</td>
    </>
  );
}
