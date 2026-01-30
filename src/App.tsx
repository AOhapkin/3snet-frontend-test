import PlanTable from './components/plan-table/PlanTable';

export default function App() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mt-6 flex justify-center">
          <PlanTable />
        </div>
      </div>
    </div>
  );
}
