"use client";

export default function DriversTable() {
  const drivers = [
    {
      name: "Michael Johnson",
      vehicle: "Toyota Van",
      phone: "08022222222",
      rating: 4.8,
      status: "Active",
    },
    {
      name: "David Lee",
      vehicle: "Bike",
      phone: "08033333333",
      rating: 4.5,
      status: "Offline",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">

      <h2 className="font-semibold mb-4">Drivers</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-left">
            <th>Name</th>
            <th>Vehicle</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver, i) => (
            <tr key={i} className="border-t">
              <td className="py-3">{driver.name}</td>
              <td>{driver.vehicle}</td>
              <td>{driver.phone}</td>
              <td>{driver.rating}</td>
              <td>{driver.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}