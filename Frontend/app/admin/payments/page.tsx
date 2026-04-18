import PaymentsChart from "../components/PaymentsChart";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Payments & Revenue
      </h1>

      <PaymentsChart />

    </div>
  );
}