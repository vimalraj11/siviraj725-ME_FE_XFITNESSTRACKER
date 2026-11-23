export default function Header({ onAdd }) {
  return (
    <header className="header">
      <h1>Health And Fitness Tracker</h1>
      <button type="button" className="btn btn-primary" onClick={onAdd}>
        + Add data
      </button>
    </header>
  );
}
