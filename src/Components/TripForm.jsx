import { useState } from "react";
import { createEmptyTrip } from "../Interfaces/trip";

function TripForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData || createEmptyTrip());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAccommodationChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      accommodation: { ...form.accommodation, [name]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, budget: Number(form.budget) });
  };

  const inputClass = "w-full rounded border border-gray-300 p-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Gezi adı"
        required
        className={inputClass}
      />
      <input
        name="destination"
        value={form.destination}
        onChange={handleChange}
        placeholder="Nereye?"
        required
        className={inputClass}
      />
      <div className="flex gap-3">
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>
            <input
        type="number"
        name="budget"
        value={form.budget}
        onChange={handleChange}
        placeholder="Bütçe (₺)"
        min="0"
        className={`${inputClass} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
      <input
        name="name"
        value={form.accommodation.name}
        onChange={handleAccommodationChange}
        placeholder="Konaklama adı"
        className={inputClass}
      />
      <input
        name="address"
        value={form.accommodation.address}
        onChange={handleAccommodationChange}
        placeholder="Konaklama adresi"
        className={inputClass}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Kaydet
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-gray-200 px-4 py-2"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}

export default TripForm;