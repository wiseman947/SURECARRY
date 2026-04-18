import DeliveryMap from "../components/DeliveryMap";

export default function TrackingPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Live Delivery Tracking
      </h1>

      <DeliveryMap />

    </div>
  );
}