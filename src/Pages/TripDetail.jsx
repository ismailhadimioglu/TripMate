import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MapView from "../Components/MapView";
import { getTrips, saveTrips, generateId } from "../utils/storage";

const formatDate = (d) => new Date(d).toLocaleDateString("tr-TR");

function TripDetail() {
  const { id } = useParams();
  const [trips, setTrips] = useState(getTrips());
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [picked, setPicked] = useState(null);

  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-100 p-6 text-center">
        <p className="mt-20 text-lg">Gezi bulunamadı.</p>
        <Link to="/" className="text-blue-600">
          Geri dön
        </Link>
      </div>
    );
  }

  const updatePlaces = (places) => {
    const updated = trips.map((t) => (t.id === id ? { ...t, places } : t));
    saveTrips(updated);
    setTrips(updated);
  };

  const addPlace = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    updatePlaces([
      ...trip.places,
      {
        id: generateId(),
        name,
        note,
        visited: false,
        lat: picked ? picked.lat : null,
        lng: picked ? picked.lng : null,
      },
    ]);
    setName("");
    setNote("");
    setPicked(null);
  };

  const toggleVisited = (placeId) =>
    updatePlaces(
      trip.places.map((p) =>
        p.id === placeId ? { ...p, visited: !p.visited } : p
      )
    );

  const deletePlace = (placeId) =>
    updatePlaces(trip.places.filter((p) => p.id !== placeId));

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-100">
      <div className="bg-linear-to-r from-blue-700 to-sky-500 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="text-sm opacity-90 hover:underline">
            ← Gezilere dön
          </Link>
          <h1 className="mt-2 text-4xl font-bold">{trip.title}</h1>
          <p className="mt-1 text-lg opacity-90">📍 {trip.destination}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 p-6">
        <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-md sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">Tarih</p>
            <p className="font-medium">
              📅 {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Bütçe</p>
            <p className="font-medium">
              💰 {Number(trip.budget).toLocaleString("tr-TR")} ₺
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Konaklama</p>
            <p className="font-medium">
              🏨 {trip.accommodation.name || "-"}
            </p>
            {trip.accommodation.address && (
              <p className="text-sm text-gray-600">
                {trip.accommodation.address}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-md">
          <h2 className="text-xl font-semibold">Harita</h2>
          <p className="mb-3 text-sm text-gray-600">
            Haritaya tıklayarak konum seç, sonra aşağıdan yeri ekle.
          </p>
          <MapView places={trip.places} picked={picked} onPick={setPicked} />
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-md">
          <h2 className="text-xl font-semibold">Ziyaret edilecek yerler</h2>

          <form onSubmit={addPlace} className="mt-3 space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Yer adı"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Not (isteğe bağlı)"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {picked ? "Haritada konum seçildi ✅" : "Konum seçilmedi"}
              </p>
              <button
                type="submit"
                className="rounded-full bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
              >
                + Yer ekle
              </button>
            </div>
          </form>

          {trip.places.length === 0 ? (
            <p className="mt-4 text-gray-500">Henüz yer eklenmedi.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {trip.places.map((place) => (
                <li
                  key={place.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-3"
                >
                  <div>
                    <p
                      className={
                        place.visited
                          ? "font-medium text-gray-400 line-through"
                          : "font-medium"
                      }
                    >
                      {place.name} {place.lat != null && "📍"}
                    </p>
                    {place.note && (
                      <p className="text-sm text-gray-600">{place.note}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleVisited(place.id)}
                      className="rounded-full bg-green-600 px-3 py-1 text-sm text-white transition hover:bg-green-700"
                    >
                      {place.visited ? "Geri al" : "Gidildi"}
                    </button>
                    <button
                      onClick={() => deletePlace(place.id)}
                      className="rounded-full bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
                    >
                      Sil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TripDetail;