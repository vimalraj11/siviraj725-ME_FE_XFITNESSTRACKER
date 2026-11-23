import { useEffect, useState } from "react";
import Header from "./components/Header";
import HealthDataForm from "./components/HealthDataForm";
import RecentStatistics from "./components/RecentStatistics";
import WeeklyTrends from "./components/WeeklyTrends";
import OverallData from "./components/OverallData";
import { loadRecords, saveRecords, toISODate } from "./utils/storage";

function getEmptyForm() {
  return {
    date: toISODate(new Date()),
    caloriesIntake: "",
    caloriesBurned: "",
    description: "",
  };
}

export default function App() {
  const [records, setRecords] = useState(() => loadRecords());
  const [formValues, setFormValues] = useState(getEmptyForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    saveRecords(records);
  }, [records]);

  function openAddForm() {
    setMode("add");
    setSelectedRecord(null);
    setFormValues(getEmptyForm());
    setIsModalOpen(true);
  }

  function openEditForm(record) {
    setMode("edit");
    setSelectedRecord(record);
    setFormValues({
      date: record.date,
      caloriesIntake: String(record.caloriesIntake),
      caloriesBurned: String(record.caloriesBurned),
      description: record.description,
    });
    setIsModalOpen(true);
  }

  function closeForm() {
    setIsModalOpen(false);
    setSelectedRecord(null);
  }

  function handleSubmit() {
    const recordData = {
      date: formValues.date,
      caloriesIntake: Number(formValues.caloriesIntake),
      caloriesBurned: Number(formValues.caloriesBurned),
      description: formValues.description.trim(),
    };

    if (mode === "edit" && selectedRecord) {
      setRecords(
        records.map((record) =>
          record.id === selectedRecord.id ? { ...record, ...recordData } : record
        )
      );
    } else {
      setRecords([...records, { id: Date.now(), ...recordData }]);
    }

    closeForm();
  }

  function handleDelete(id) {
    setRecords(records.filter((record) => record.id !== id));
  }

  return (
    <div className="app">
      <Header onAdd={openAddForm} />

      <main className="layout">
        <RecentStatistics records={records} onEdit={openEditForm} onDelete={handleDelete} />
        <div className="charts">
          <OverallData records={records} />
          {records.length > 0 && <WeeklyTrends records={records} />}
        </div>
      </main>

      {isModalOpen && (
        <HealthDataForm
          mode={mode}
          formValues={formValues}
          setFormValues={setFormValues}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}
