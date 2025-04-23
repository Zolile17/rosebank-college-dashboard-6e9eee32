
import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";
import { departmentData } from "@/data/dashboardData";

const StudentsByDepartmentChart = () => (
  <Card className="bg-gray-900 border-none">
    <CardHeader>
      <CardTitle className="text-white">Students by Department</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={departmentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="Students" fill="#ea384c" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default StudentsByDepartmentChart;
