"use client";

export default function UsersTable() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@email.com",
      phone: "08012345678",
      bookings: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@email.com",
      phone: "08087654321",
      bookings: 5,
      status: "Suspended",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">

      <h2 className="font-semibold mb-4">Users</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-left">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Bookings</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-3">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.bookings}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}