export default function RecentBookings() {
  const bookings = [
    {
      id: "SC001",
      user: "Chinaza, Chinwendu",
      service: "Delivery",
      status: "Completed",
    },
    {
      id: "SC002",
      user: "Favour, Hart",
      service: "Ride",
      status: "Pending",
    },
    {
      id: "SC003",
      user: "Michael Allison",
      service: "Moving Goods",
      status: "In Progress",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mt-6">

      <h2 className="font-semibold mb-4">
        Recent Bookings
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-2">Booking ID</th>
            <th>User</th>
            <th>Service</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-t">
              <td className="py-3">{booking.id}</td>
              <td>{booking.user}</td>
              <td>{booking.service}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}