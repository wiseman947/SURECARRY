import BookingsTable from "../components/BookingsTable";

export default function BookingsPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Bookings Management
      </h1>

      <BookingsTable />

    </div>
  );
}