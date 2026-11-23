export const STORAGE_KEY = "healthAndFitness";

export function loadRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const records = saved ? JSON.parse(saved) : [];
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}

export function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// Turns a Date into "YYYY-MM-DD" using local time (same format as <input type="date">).
export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Builds one entry per calendar day for today and the 6 days before it,
// then adds up the calories of every record that falls on each day.
export function getLastSevenDays(records) {
  const today = new Date();
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    days.push({
      date: toISODate(day),
      label: day.toLocaleDateString(undefined, { weekday: "short" }),
      intake: 0,
      burned: 0,
    });
  }

  records.forEach((record) => {
    const matchingDay = days.find((day) => day.date === record.date);
    if (matchingDay) {
      matchingDay.intake += Number(record.caloriesIntake);
      matchingDay.burned += Number(record.caloriesBurned);
    }
  });

  return days;
}
