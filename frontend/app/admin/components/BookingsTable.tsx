"use client";

export default function BookingsTable() {
  const bookings = [
    {
      id: "SC1001",
      user: "John Doe",
      service: "Delivery",
      driver: "Mike",
      status: "Completed",
    },
    {
      id: "SC1002",
      user: "Sarah Smith",
      service: "Ride",
      driver: "David",
      status: "In Progress",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">

      <h2 className="font-semibold mb-4">Bookings</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>ID</th>
            <th>User</th>
            <th>Service</th>
            <th>Driver</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="py-3">{b.id}</td>
              <td>{b.user}</td>
              <td>{b.service}</td>
              <td>{b.driver}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}