import PaymentsChart from "../components/PaymentsChart";
export const dynamic = 'force-dynamic'
export const revalidate = 0

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