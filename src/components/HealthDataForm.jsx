import { useState } from "react";

export default function HealthDataForm({ mode, formValues, setFormValues, onSubmit, onCancel }) {
  const [error, setError] = useState("");
  const isEdit = mode === "edit";

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { date, caloriesIntake, caloriesBurned, description } = formValues;

    if (!date || caloriesIntake === "" || caloriesBurned === "" || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (Number(caloriesIntake) < 0 || Number(caloriesBurned) < 0) {
      setError("Calories cannot be negative.");
      return;
    }

    onSubmit();
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <h2>{isEdit ? "Let's see what you want to change!" : "Update Today's Data"}</h2>

        <form onSubmit={handleSubmit} className="form" noValidate>
          <label className="field">
            <span>Date</span>
            <input type="date" name="date" value={formValues.date} onChange={handleChange} />
          </label>

          <label className="field">
            <span>Calories Intake</span>
            <input
              type="number"
              name="caloriesIntake"
              min="0"
              placeholder="Enter Today's Calorie Intake"
              value={formValues.caloriesIntake}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>Calories Burned</span>
            <input
              type="number"
              name="caloriesBurned"
              min="0"
              placeholder="Enter Today's Calorie Burned"
              value={formValues.caloriesBurned}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>Short Description</span>
            <input
              type="text"
              name="description"
              placeholder="Enter a short description"
              value={formValues.description}
              onChange={handleChange}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
