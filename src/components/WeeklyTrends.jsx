import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getLastSevenDays } from "../utils/storage";

export default function WeeklyTrends({ records }) {
  const data = getLastSevenDays(records);

  return (
    <section className="card chart-card">
      <h2>Weekly Health Trends</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--grid)" />
            <XAxis dataKey="label" interval={0} tick={{ fontSize: 11, fill: "var(--muted)" }} />
            <YAxis tick={{ fontSize: 12, fill: "var(--muted)" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="intake" name="Calories Intake" fill="var(--intake)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="burned" name="Calories Burned" fill="var(--burned)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
