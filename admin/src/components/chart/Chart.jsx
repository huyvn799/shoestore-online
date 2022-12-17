import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar
} from "recharts";

export default function Chart({ title, data, dataKey, grid, domain }) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" height="auto" 
        aspect={4 / 1}
      >
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis type="number" domain={domain} allowDecimals={false}/>
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          {/* <Bar dataKey={dataKey} barSize={20} fill="#413ea0" /> */}
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
