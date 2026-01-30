import { useEffect, useState } from 'react';
import type { ApiResponse } from '../../api/types';
import { fetchApiData } from '../../api/fetchData';
import PlanTableHead from './PlanTableHead';
import PlanTableBody from './PlanTableBody';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getWindowIndexes(start: number, size = 6): number[] {
  return Array.from({ length: size }, (_, i) => (start + i) % 12);
}

export default function PlanTable() {
  const nowMonth = new Date().getMonth();
  const [startIndex, setStartIndex] = useState(nowMonth);
  const [data, setData] = useState<ApiResponse['data'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiData()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return null;
  }

  const visibleIdx = getWindowIndexes(startIndex, 6);
  const visibleMonthsNames = visibleIdx.map((i) => MONTHS[i]);
  const visibleTotal = visibleIdx.map((i) => data.total?.[i] ?? null);
  const visibleRows = data.table.map((row) => ({
    ...row,
    months: visibleIdx.map((i) => row.months[i] ?? null),
  }));

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setStartIndex((prev) => (prev + 11) % 12)}
          aria-label="предыдущий месяц"
        >
          ←
        </button>
        <button
          onClick={() => setStartIndex((prev) => (prev + 1) % 12)}
          aria-label="следующий месяц"
        >
          →
        </button>
      </div>
      <table>
        <PlanTableHead months={visibleMonthsNames} />
        <PlanTableBody total={visibleTotal} rows={visibleRows} />
      </table>
    </div>
  );
}
