
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User as UserIcon, Clock, RefreshCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const TutorChat = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m Kira, your AI tutor for data structures and algorithms. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call to anthropic)
    setTimeout(() => {
      // Example responses based on user input
      let responseContent = '';
      
      if (input.toLowerCase().includes('linked list')) {
        responseContent = "A linked list is a linear data structure where elements are stored in nodes. Each node contains a data field and a reference (link) to the next node in the sequence. Unlike arrays, linked lists don't have a fixed size and memory allocation is dynamic. Would you like me to explain more about singly linked lists, doubly linked lists, or circular linked lists?";
      } else if (input.toLowerCase().includes('recursion')) {
        responseContent = "Recursion is a programming technique where a function calls itself to solve a problem. Every recursive solution has two components: a base case (that stops the recursion) and a recursive case. For example, calculating factorial: n! = n * (n-1)! with a base case of 1! = 1. Would you like to see a code example?";
      } else if (input.toLowerCase().includes('sort') || input.toLowerCase().includes('algorithm')) {
        responseContent = "Sorting algorithms arrange elements in a specific order (usually ascending or descending). Some common sorting algorithms include: Bubble Sort (O(n²)), Selection Sort (O(n²)), Insertion Sort (O(n²)), Merge Sort (O(n log n)), Quick Sort (average O(n log n)), and Heap Sort (O(n log n)). Which one would you like to learn more about?";
      } else {
        responseContent = "That's a great question! I can help you understand this concept better. Would you like me to provide a detailed explanation, a code example, or a practice problem related to this topic?";
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hi! I\'m Kira, your AI tutor for data structures and algorithms. How can I help you today?',
        timestamp: new Date(),
      },
    ]);
    
    toast({
      title: "Chat cleared",
      description: "Your conversation has been reset.",
    });
  };

  return (
    <Card className="flex flex-col h-[600px] border shadow-sm">
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-medium">Kira AI Tutor</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClearChat}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              {message.role === 'user' ? 
                <UserIcon className="h-4 w-4" /> : 
                <Bot className="h-4 w-4" />
              }
              <span className="text-xs font-medium">
                {message.role === 'user' ? 'You' : 'Kira'}
              </span>
              <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        ))}
        
        {isLoading && (
          <div className="chat-bubble chat-bubble-ai">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
              <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-150"></span>
              <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-300"></span>
            </div>
          </div>
        )}
      </CardContent>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Ask a question about data structures & algorithms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default TutorChat;
