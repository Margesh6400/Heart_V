import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#FF0000", "#FFA500", "#00FF00"];

const PieChartComponent = ({ data }) => {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
