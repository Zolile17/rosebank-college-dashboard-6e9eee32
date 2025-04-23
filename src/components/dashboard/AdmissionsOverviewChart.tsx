
import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";
import { studentData } from "@/data/dashboardData";

const AdmissionsOverviewChart = () => (
  <Card className="bg-gray-900 border-none">
    <CardHeader>
      <CardTitle className="text-white">Admissions Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={studentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="Admissions" fill="#ea384c" />
          <Bar dataKey="Applications" fill="#ffffff" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default AdmissionsOverviewChart;
