export default function DashboardCards() {
  const cards = [
    { title: "Total Users", value: "1,245" },
    { title: "Active Drivers", value: "320" },
    { title: "Deliveries Today", value: "89" },
    { title: "Revenue", value: "₦500,430" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <p className="text-gray-500 text-sm">{card.title}</p>
          <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
        </div>
      ))}

    </div>
  );
}