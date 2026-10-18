import { useState } from "react";
import TripCard from "../Components/TripCard";
import TripForm from "../Components/TripForm";
import { getTrips, saveTrips, generateId } from "../utils/storage";

function Home() {
  const [trips, setTrips] = useState(getTrips());
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  const update = (list) => {
    saveTrips(list);
    setTrips(list);
  };

  const handleAdd = (data) => {
    update([...trips, { ...data, id: generateId() }]);
    setShowForm(false);
  };

  const handleUpdate = (data) => {
    update(trips.map((t) => (t.id === data.id ? data : t)));
    setEditingTrip(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu gezi silinsin mi?")) {
      update(trips.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-100">
      <div className="bg-linear-to-r from-blue-700 to-sky-500 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">TripMate ✈️</h1>
          <p className="mt-2 text-lg opacity-90">
            Gezilerini planla, gideceğin yerleri kaydet.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl p-6">
        {editingTrip ? (
          <div className="max-w-lg">
            <TripForm
              key={editingTrip.id}
              initialData={editingTrip}
              onSubmit={handleUpdate}
              onCancel={() => setEditingTrip(null)}
            />
          </div>
        ) : showForm ? (
          <div className="max-w-lg">
            <TripForm
              onSubmit={handleAdd}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-blue-600 px-6 py-2 font-medium text-white shadow-md transition hover:bg-blue-700"
          >
            + Yeni gezi ekle
          </button>
        )}

        {trips.length === 0 ? (
          <p className="mt-8 text-gray-500">Henüz gezi yok.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onEdit={setEditingTrip}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;