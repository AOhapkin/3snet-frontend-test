import { useEffect, useState } from "react";
import { fetchApiData } from "./api/fetchData";
import type { ApiResponse } from "./api/types";

import {
  formatMonthLabelRu,
  getCurrentMonthIndex,
  getMonthWindow,
  shiftMonthIndex,
} from "./domain/months";
import { buildTableModel } from "./domain/transform";

export default function App() {
  const [api, setApi] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [startMonthIndex, setStartMonthIndex] = useState<number>(() =>
    getCurrentMonthIndex()
  );

  useEffect(() => {
    fetchApiData()
      .then((data) => {
        setApi(data);
        setError(null);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Ошибка загрузки данных");
      });
  }, []);

  const months = getMonthWindow(startMonthIndex, 6);
  const monthLabels = months.map((monthIndex) =>
    formatMonthLabelRu(monthIndex)
  );

  const tableModel =
    api && api.success ? buildTableModel(api.data, months) : null;

  const hasData = api?.success && tableModel;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-semibold">3SNET — тестовое задание</div>
            <div className="text-sm opacity-70">
              Окно из 6 месяцев, циклический сдвиг
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 active:scale-[0.99]"
              onClick={() =>
                setStartMonthIndex((value) => shiftMonthIndex(value, -1))
              }
              aria-label="предыдущий месяц"
            >
              ←
            </button>
            <button
              className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 active:scale-[0.99]"
              onClick={() =>
                setStartMonthIndex((value) => shiftMonthIndex(value, 1))
              }
              aria-label="следующий месяц"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-xl border p-4">
          <div className="text-sm">
            {!api && !error && <span>Загрузка данных...</span>}
            {error ? (
              <span className="text-red-600">Ошибка: {error}</span>
            ) : null}
          </div>

          <div className="mt-4">
            <div className="text-sm font-medium">Текущее окно из 6 месяцев:</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {monthLabels.map((label, index) => (
                <span
                  key={`${months[index]}-${label}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {hasData ? (
            <div className="mt-4 text-sm opacity-70">
              Данные получены, таблица будет выведена здесь по макету.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}