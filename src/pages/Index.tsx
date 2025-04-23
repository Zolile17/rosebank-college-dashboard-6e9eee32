
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Sample data to match the dashboard
const studentData = [
  { name: 'Jan', Admissions: 400, Applications: 240 },
  { name: 'Feb', Admissions: 300, Applications: 139 },
  { name: 'Mar', Admissions: 200, Applications: 380 },
  { name: 'Apr', Admissions: 278, Applications: 390 },
  { name: 'May', Admissions: 189, Applications: 480 },
  { name: 'Jun', Admissions: 239, Applications: 380 },
];

const departmentData = [
  { name: 'Business', Students: 450 },
  { name: 'IT', Students: 350 },
  { name: 'Design', Students: 250 },
  { name: 'Engineering', Students: 200 },
];

const Index = () => {
  return (
    <div className="p-4 space-y-4 bg-black text-white min-h-screen">
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#ea384c] text-white">
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">1,250</CardContent>
        </Card>
        <Card className="bg-[#ea384c] text-white">
          <CardHeader>
            <CardTitle>New Applications</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">520</CardContent>
        </Card>
        <Card className="bg-[#ea384c] text-white">
          <CardHeader>
            <CardTitle>Departments</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">4</CardContent>
        </Card>
        <Card className="bg-[#ea384c] text-white">
          <CardHeader>
            <CardTitle>International Students</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">120</CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
};

export default Index;
