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
      <div className="w-[1360px] mx-auto flex items-center justify-between mt-6 mb-6">
        <button className="h-10 w-[130px] px-3 flex items-center justify-between rounded-sm border border-border bg-white text-brand-700 font-medium transition-colors duration-150 cursor-pointer hover:bg-surface hover:border-brand-500">
          <span>Year 2025</span>
          <span className="text-brand-700">▾</span>
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setStartIndex((prev) => (prev + 11) % 12)}
            aria-label="предыдущий месяц"
            className="h-10 w-10 rounded-md border border-[#DDDEDF] bg-white text-brand-900 flex items-center justify-center transition-colors duration-150 cursor-pointer hover:bg-surface hover:border-brand-500 active:bg-border"
          >
            ←
          </button>
          <button
            onClick={() => setStartIndex((prev) => (prev + 1) % 12)}
            aria-label="следующий месяц"
            className="h-10 w-10 rounded-md border border-[#DDDEDF] bg-white text-brand-900 flex items-center justify-center transition-colors duration-150 cursor-pointer hover:bg-surface hover:border-brand-500 active:bg-border"
          >
            →
          </button>
          <button className="h-10 w-[109px] rounded-sm bg-brand-900 text-white font-medium flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer hover:bg-brand-700 active:bg-brand-500">
            <span className="text-xl leading-none">+</span>
            <span>Add plan</span>
          </button>
        </div>
      </div>
      <div className="w-[1360px] mx-auto">
        <table className="w-full border border-border border-collapse table-fixed text-sm leading-none align-middle text-[12px]">
          <PlanTableHead months={visibleMonthsNames} />
          <PlanTableBody total={visibleTotal} rows={visibleRows} />
        </table>
      </div>
    </div>
  );
}
