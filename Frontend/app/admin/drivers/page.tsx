import DriversTable from "../components/DriversTable";

export default function DriversPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Drivers Management
      </h1>

      <DriversTable />

    </div>
  );
}