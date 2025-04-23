
import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { studentData } from "@/data/dashboardData";

const chartConfig = {
  Admissions: { color: "#ea384c" },
  Applications: { color: "#ffffff" }
};

const AdmissionsOverviewChart = () => (
  <Card className="bg-gray-900 border-none">
    <CardHeader>
      <CardTitle className="text-white">Admissions Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart data={studentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="Admissions" fill="#ea384c" />
          <Bar dataKey="Applications" fill="#ffffff" />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default AdmissionsOverviewChart;
