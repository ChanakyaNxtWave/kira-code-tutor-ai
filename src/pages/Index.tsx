
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TutorChat from '@/components/ai/TutorChat';
import ConceptMap from '@/components/knowledge/ConceptMap';
import ProgressChart from '@/components/dashboard/ProgressChart';
import ProblemCard from '@/components/problems/ProblemCard';
import { MessageCircle, Network, BarChart2, BookOpen, Code } from 'lucide-react';

// Mock problems data - in a real app, this would come from the Neo4j database
const recommendedProblems = [
  {
    id: 'array_reversal',
    name: 'Array Reversal',
    difficulty: 1,
    description: 'Write a function to reverse an array in-place.',
    hint: 'Use two pointers, one at the start and one at the end.'
  },
  {
    id: 'reverse_linked_list',
    name: 'Reverse Linked List',
    difficulty: 2,
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    hint: 'Keep track of prev, current, and next pointers.'
  },
  {
    id: 'valid_parentheses',
    name: 'Valid Parentheses',
    difficulty: 2,
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.',
    hint: 'Use a stack to keep track of opening brackets.'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("chat");
  
  return (
    <div className="min-h-screen flex flex-col bg-kira-background">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6 space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-r from-kira-primary to-kira-accent rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Welcome back, Rahul!</h1>
                  <p className="text-white/80 mt-1">
                    Ready to continue your DSA journey?
                  </p>
                </div>
                
                <Button variant="secondary" className="bg-white text-kira-primary hover:bg-white/90">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-md p-3 text-white">
                  <p className="text-xs uppercase tracking-wider text-white/70">Problems Solved</p>
                  <p className="text-2xl font-bold mt-1">28</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-md p-3 text-white">
                  <p className="text-xs uppercase tracking-wider text-white/70">Average Confidence</p>
                  <p className="text-2xl font-bold mt-1">78%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-md p-3 text-white">
                  <p className="text-xs uppercase tracking-wider text-white/70">Learning Streak</p>
                  <p className="text-2xl font-bold mt-1">7 days</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Your Learning Path</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Arrays & Linked Lists</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <Code className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Stacks & Queues</p>
                  <p className="text-sm text-muted-foreground">In progress - 75%</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-0.5">
                  <Network className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Trees & Graphs</p>
                  <p className="text-sm text-muted-foreground">Coming up next</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-0.5">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Dynamic Programming</p>
                  <p className="text-sm text-muted-foreground">Locked</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">AI Tutor</span>
              </TabsTrigger>
              <TabsTrigger value="concepts" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                <span className="hidden sm:inline">Concept Map</span>
              </TabsTrigger>
              <TabsTrigger value="problems" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">Problems</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span className="hidden sm:inline">Progress</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="m-0">
              <TutorChat />
            </TabsContent>
            
            <TabsContent value="concepts" className="m-0">
              <ConceptMap width={800} height={500} />
            </TabsContent>
            
            <TabsContent value="problems" className="m-0">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Recommended Problems</h2>
                <div className="space-y-4">
                  {recommendedProblems.map((problem) => (
                    <ProblemCard 
                      key={problem.id} 
                      problem={problem} 
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="m-0">
              <ProgressChart />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
