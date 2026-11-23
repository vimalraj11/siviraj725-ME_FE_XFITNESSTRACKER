import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function OverallData({ records }) {
  const totalIntake = records.reduce((s, r) => s + (Number(r.caloriesIntake) || 0), 0);
  const totalBurned = records.reduce((s, r) => s + (Number(r.caloriesBurned) || 0), 0);
  const hasData = totalIntake + totalBurned > 0;

  const data = hasData
    ? [
        { name: "Calories Intake", value: totalIntake, color: "var(--intake)" },
        { name: "Calories Burned", value: totalBurned, color: "var(--burned)" },
      ]
    : [{ name: "No data", value: 1, color: "var(--empty)" }];

  return (
    <section className="card chart-card">
      <h2>Overall Data</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="45%" outerRadius="75%" paddingAngle={hasData ? 2 : 0}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            {hasData && <Tooltip formatter={(v) => `${v} kcal`} />}
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
