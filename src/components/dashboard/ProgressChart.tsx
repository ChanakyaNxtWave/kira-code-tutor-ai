
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  studentData?: Array<{
    date: string;
    problems_solved: number;
    confidence: number;
  }>;
  className?: string;
}

// Mock data - in a real app, this would come from the Neo4j database
const mockProgressData = [
  { date: '2025-01-20', problems_solved: 2, confidence: 40 },
  { date: '2025-01-27', problems_solved: 5, confidence: 45 },
  { date: '2025-02-03', problems_solved: 8, confidence: 50 },
  { date: '2025-02-10', problems_solved: 10, confidence: 55 },
  { date: '2025-02-17', problems_solved: 12, confidence: 62 },
  { date: '2025-02-24', problems_solved: 15, confidence: 68 },
  { date: '2025-03-03', problems_solved: 18, confidence: 73 },
  { date: '2025-03-10', problems_solved: 22, confidence: 78 },
  { date: '2025-03-17', problems_solved: 25, confidence: 82 },
  { date: '2025-03-24', problems_solved: 28, confidence: 85 },
];

const ProgressChart = ({ studentData = mockProgressData, className }: ProgressChartProps) => {
  // Format the data for better display
  const formattedData = studentData.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 5, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              tick={{ fontSize: 12 }}
              domain={[0, 'auto']}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                border: '1px solid #e2e8f0',
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="problems_solved"
              name="Problems Solved"
              stroke="#3b82f6"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="confidence"
              name="Confidence Score"
              stroke="#8b5cf6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
