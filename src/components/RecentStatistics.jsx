import { formatDate } from "../utils/storage";

export default function RecentStatistics({ records, onEdit, onDelete }) {
  const sorted = [...records].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return (
    <section className="card recent">
      <h2>Recent Health Statistics</h2>
      {sorted.length === 0 ? (
        <p className="empty">No data yet. Click + Add data to log your first day.</p>
      ) : (
        <ul className="stat-list">
          {sorted.map((r) => (
            <li key={r.id} className="stat-item">
              <div className="stat-main">
                <span className="stat-date">{formatDate(r.date)}</span>
                <span className="stat-desc">{r.description}</span>
              </div>
              <div className="stat-values">
                <span className="pill pill-intake">Intake: {r.caloriesIntake} kcal</span>
                <span className="pill pill-burned">Burned: {r.caloriesBurned} kcal</span>
              </div>
              <div className="stat-actions">
                <button type="button" className="btn btn-small" onClick={() => onEdit(r)}>
                  Edit
                </button>
                <button type="button" className="btn btn-small btn-danger" onClick={() => onDelete(r.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
