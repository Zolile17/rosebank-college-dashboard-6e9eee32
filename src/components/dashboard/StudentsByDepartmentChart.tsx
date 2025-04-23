
import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { departmentData } from "@/data/dashboardData";

const chartConfig = {
  Students: { color: "#ea384c" }
};

const StudentsByDepartmentChart = () => (
  <Card className="bg-gray-900 border-none">
    <CardHeader>
      <CardTitle className="text-white">Students by Department</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart data={departmentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="Students" fill="#ea384c" />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default StudentsByDepartmentChart;
