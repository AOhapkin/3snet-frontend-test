
interface MonthCellProps {
  plan: number | null;
  fact: number | null;
}

export default function MonthCell({ plan, fact }: MonthCellProps) {
  if (plan === null && fact === null) {
    return <td colSpan={2}>No data</td>;
  }

  return (
    <>
      <td>{plan}</td>
      <td>{fact}</td>
    </>
  );
}
