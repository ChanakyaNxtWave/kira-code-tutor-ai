
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressChart from '@/components/dashboard/ProgressChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, Download, Users, BookOpen, Brain, Award } from 'lucide-react';
import { AreaChart, Area } from 'recharts';

// Mock students data
const students = [
  { id: 'demo-user-123', name: 'Rahul Agarwal', college: 'IIT Delhi', progress: 85, concepts_mastered: 8, problems_solved: 28, last_active: '2 hours ago' },
  { id: 'student-456', name: 'Priya Patel', college: 'BITS Pilani', progress: 72, concepts_mastered: 5, problems_solved: 21, last_active: '1 day ago' },
  { id: 'student-789', name: 'Vikram Singh', college: 'NIT Trichy', progress: 58, concepts_mastered: 3, problems_solved: 15, last_active: '3 days ago' },
  { id: 'student-101', name: 'Arun Kumar', college: 'NIT Warangal', progress: 79, concepts_mastered: 7, problems_solved: 24, last_active: '12 hours ago' },
  { id: 'student-202', name: 'Neha Verma', college: 'IIIT Hyderabad', progress: 65, concepts_mastered: 4, problems_solved: 18, last_active: '1 week ago' },
];

// Mock concept mastery data
const conceptMasteryData = [
  { name: 'Arrays', mastered: 5, struggling: 0 },
  { name: 'Linked Lists', mastered: 4, struggling: 1 },
  { name: 'Stacks', mastered: 3, struggling: 2 },
  { name: 'Queues', mastered: 3, struggling: 2 },
  { name: 'Recursion', mastered: 2, struggling: 3 },
  { name: 'Trees', mastered: 1, struggling: 4 },
  { name: 'Graphs', mastered: 0, struggling: 5 },
  { name: 'Dynamic Prog.', mastered: 0, struggling: 5 },
];

// Mock engagement data
const engagementData = [
  { date: 'Jan 1', sessions: 12, problems_attempted: 15, interactions: 25 },
  { date: 'Jan 8', sessions: 14, problems_attempted: 18, interactions: 30 },
  { date: 'Jan 15', sessions: 10, problems_attempted: 12, interactions: 22 },
  { date: 'Jan 22', sessions: 15, problems_attempted: 20, interactions: 35 },
  { date: 'Jan 29', sessions: 18, problems_attempted: 25, interactions: 40 },
  { date: 'Feb 5', sessions: 20, problems_attempted: 28, interactions: 45 },
  { date: 'Feb 12', sessions: 22, problems_attempted: 30, interactions: 48 },
  { date: 'Feb 19', sessions: 25, problems_attempted: 35, interactions: 60 },
  { date: 'Feb 26', sessions: 28, problems_attempted: 40, interactions: 65 },
  { date: 'Mar 5', sessions: 30, problems_attempted: 42, interactions: 70 },
];

// Mock problem difficulty distribution
const difficultyDistData = [
  { name: 'Easy', value: 35, color: '#10b981' },
  { name: 'Medium', value: 45, color: '#3b82f6' },
  { name: 'Hard', value: 20, color: '#ef4444' },
];

const TeacherDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-kira-background">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              DSA-101 Class Overview
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="semester">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="semester">Current Semester</SelectItem>
                <SelectItem value="year">Full Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Problems Solved</p>
                <p className="text-2xl font-bold">21.2</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Concepts Mastered</p>
                <p className="text-2xl font-bold">5.4</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-bold">72%</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Class Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="concepts">Concept Mastery</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Class Progress */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Class Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="sessions" 
                      name="Learning Sessions"
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.2} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="problems_attempted" 
                      name="Problems Attempted"
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.2} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="interactions" 
                      name="AI Interactions"
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Problem Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Problem Difficulty Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={difficultyDistData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {difficultyDistData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 mt-4">
                    {difficultyDistData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Concept Mastery Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      layout="vertical"
                      data={conceptMasteryData.slice(0, 6)}
                      margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fontSize: 12 }} 
                        width={80} 
                      />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="mastered" 
                        name="Students Mastered" 
                        fill="#10b981" 
                      />
                      <Bar 
                        dataKey="struggling" 
                        name="Students Struggling" 
                        fill="#ef4444" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Student Roster</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left font-medium">Name</th>
                      <th className="h-12 px-4 text-left font-medium">College</th>
                      <th className="h-12 px-4 text-left font-medium">Progress</th>
                      <th className="h-12 px-4 text-left font-medium">Concepts Mastered</th>
                      <th className="h-12 px-4 text-left font-medium">Problems Solved</th>
                      <th className="h-12 px-4 text-left font-medium">Last Active</th>
                      <th className="h-12 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="p-4 align-middle font-medium">{student.name}</td>
                        <td className="p-4 align-middle">{student.college}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span>{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{student.concepts_mastered}</td>
                        <td className="p-4 align-middle">{student.problems_solved}</td>
                        <td className="p-4 align-middle text-muted-foreground">{student.last_active}</td>
                        <td className="p-4 align-middle">
                          <Button variant="outline" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Concepts Tab */}
          <TabsContent value="concepts" className="space-y-6">
            <h2 className="text-xl font-semibold">Concept Mastery Analysis</h2>
            
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left font-medium">Concept</th>
                      <th className="h-12 px-4 text-left font-medium">Category</th>
                      <th className="h-12 px-4 text-left font-medium">Difficulty</th>
                      <th className="h-12 px-4 text-left font-medium">Students Mastered</th>
                      <th className="h-12 px-4 text-left font-medium">Students Struggling</th>
                      <th className="h-12 px-4 text-left font-medium">Avg. Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Arrays</td>
                      <td className="p-4 align-middle">Data Structure</td>
                      <td className="p-4 align-middle">1/5</td>
                      <td className="p-4 align-middle">5</td>
                      <td className="p-4 align-middle">0</td>
                      <td className="p-4 align-middle">92%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Linked Lists</td>
                      <td className="p-4 align-middle">Data Structure</td>
                      <td className="p-4 align-middle">2/5</td>
                      <td className="p-4 align-middle">4</td>
                      <td className="p-4 align-middle">1</td>
                      <td className="p-4 align-middle">85%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Stacks</td>
                      <td className="p-4 align-middle">Data Structure</td>
                      <td className="p-4 align-middle">2/5</td>
                      <td className="p-4 align-middle">3</td>
                      <td className="p-4 align-middle">2</td>
                      <td className="p-4 align-middle">78%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Recursion</td>
                      <td className="p-4 align-middle">Technique</td>
                      <td className="p-4 align-middle">3/5</td>
                      <td className="p-4 align-middle">2</td>
                      <td className="p-4 align-middle">3</td>
                      <td className="p-4 align-middle">62%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Trees</td>
                      <td className="p-4 align-middle">Data Structure</td>
                      <td className="p-4 align-middle">3/5</td>
                      <td className="p-4 align-middle">1</td>
                      <td className="p-4 align-middle">4</td>
                      <td className="p-4 align-middle">48%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Graphs</td>
                      <td className="p-4 align-middle">Data Structure</td>
                      <td className="p-4 align-middle">4/5</td>
                      <td className="p-4 align-middle">0</td>
                      <td className="p-4 align-middle">5</td>
                      <td className="p-4 align-middle">25%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Concept Dependency Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This visualization shows how student performance in prerequisite concepts affects performance in dependent concepts.
                </p>
                <div className="h-[400px] flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Knowledge Graph Visualization<br />(This would display a Neo4j visualization)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Student Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Common Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="p-3 bg-muted rounded-md">
                      <p className="font-medium">How does recursion work?</p>
                      <p className="text-sm text-muted-foreground mt-1">Asked by 4 students</p>
                    </li>
                    <li className="p-3 bg-muted rounded-md">
                      <p className="font-medium">What's the difference between BFS and DFS?</p>
                      <p className="text-sm text-muted-foreground mt-1">Asked by 3 students</p>
                    </li>
                    <li className="p-3 bg-muted rounded-md">
                      <p className="font-medium">How to balance a binary search tree?</p>
                      <p className="text-sm text-muted-foreground mt-1">Asked by 3 students</p>
                    </li>
                    <li className="p-3 bg-muted rounded-md">
                      <p className="font-medium">When to use dynamic programming?</p>
                      <p className="text-sm text-muted-foreground mt-1">Asked by 2 students</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Learning Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="p-3 bg-muted rounded-md">
                      <p className="font-medium">Peak Activity Times</p>
                      <p className="text-sm text-muted-foreground mt-1">Most students study between 8 PM - 10 PM</p>
                    </li>
                    <li className="p-3 bg-muted rounded-md">
                      <p className="font-medium">Study Duration</p>
                      <p className="text-sm text-muted-foreground mt-1">Average session length: 42 minutes</p>
                    </li>
                    <li className="p-3 bg-muted rounded-md">
                      <p className="font-medium">Preferred Learning Style</p>
                      <p className="text-sm text-muted-foreground mt-1">60% learn better with examples, 40% with step-by-step explanations</p>
                    </li>
                    <li className="p-3 bg-muted rounded-md">
                      <p className="font-medium">Revisit Rate</p>
                      <p className="text-sm text-muted-foreground mt-1">Students revisit concepts an average of 3.2 times</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
