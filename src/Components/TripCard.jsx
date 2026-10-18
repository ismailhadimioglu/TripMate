import { Link } from "react-router-dom";

const formatDate = (d) => new Date(d).toLocaleDateString("tr-TR");

function TripCard({ trip, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-linear-to-r from-blue-600 to-sky-400 p-4 text-white">
        <h2 className="text-xl font-semibold">{trip.title}</h2>
        <p className="text-sm opacity-90">📍 {trip.destination}</p>
      </div>
      <div className="space-y-1 p-4 text-sm text-gray-700">
        <p>
          📅 {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
        </p>
        <p>💰 {Number(trip.budget).toLocaleString("tr-TR")} ₺</p>
        <p>🏨 {trip.accommodation.name || "-"}</p>
        <p>🗺️ {trip.places.length} yer</p>
        <div className="flex gap-2 pt-3">
          <Link
            to={`/trip/${trip.id}`}
            className="rounded-full bg-blue-600 px-4 py-1 text-white transition hover:bg-blue-700"
          >
            Detay
          </Link>
          <button
            onClick={() => onEdit(trip)}
            className="rounded-full bg-amber-500 px-4 py-1 text-white transition hover:bg-amber-600"
          >
            Düzenle
          </button>
          <button
            onClick={() => onDelete(trip.id)}
            className="rounded-full bg-red-500 px-4 py-1 text-white transition hover:bg-red-600"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripCard;