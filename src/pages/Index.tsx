
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdmissionsOverviewChart from "@/components/dashboard/AdmissionsOverviewChart";
import StudentsByDepartmentChart from "@/components/dashboard/StudentsByDepartmentChart";
import { dashboardStats } from "@/data/dashboardData";

const Index = () => (
  <div className="p-4 space-y-4 bg-black text-white min-h-screen">
    <div className="grid grid-cols-4 gap-4">
      {dashboardStats.map((stat) => (
        <Card className="bg-[#ea384c] text-white" key={stat.label}>
          <CardHeader>
            <CardTitle>{stat.label}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stat.value}</CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <AdmissionsOverviewChart />
      <StudentsByDepartmentChart />
    </div>
  </div>
);

export default Index;
