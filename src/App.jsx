import { useEffect, useState } from "react";
import Header from "./components/Header";
import HealthDataForm from "./components/HealthDataForm";
import RecentStatistics from "./components/RecentStatistics";
import WeeklyTrends from "./components/WeeklyTrends";
import OverallData from "./components/OverallData";
import { hasRecordsInLastSevenDays, loadRecords, saveRecords, toISODate } from "./utils/storage";

function getEmptyForm() {
  return {
    date: toISODate(new Date()),
    caloriesIntake: "",
    caloriesBurned: "",
    description: "",
  };
}

function scrollToForm() {
  document.getElementById("health-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [records, setRecords] = useState(() => loadRecords());
  const [formValues, setFormValues] = useState(getEmptyForm);
  const [mode, setMode] = useState("add");
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    saveRecords(records);
  }, [records]);

  function resetForm() {
    setMode("add");
    setSelectedRecord(null);
    setFormValues(getEmptyForm());
  }

  function openAddForm() {
    resetForm();
    scrollToForm();
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
    scrollToForm();
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

    resetForm();
  }

  function handleDelete(id) {
    setRecords(records.filter((record) => record.id !== id));
    if (selectedRecord && selectedRecord.id === id) {
      resetForm();
    }
  }

  return (
    <div className="app">
      <Header onAdd={openAddForm} />

      <main className="layout">
        <div className="side">
          <HealthDataForm
            mode={mode}
            formValues={formValues}
            setFormValues={setFormValues}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
          <RecentStatistics records={records} onEdit={openEditForm} onDelete={handleDelete} />
        </div>
        <div className="charts">
          <OverallData records={records} />
          {hasRecordsInLastSevenDays(records) && <WeeklyTrends records={records} />}
        </div>
      </main>
    </div>
  );
}
