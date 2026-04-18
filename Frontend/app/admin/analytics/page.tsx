import PaymentsChart from "../components/PaymentsChart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Platform Analytics
      </h1>

      <PaymentsChart />

    </div>
  );
}