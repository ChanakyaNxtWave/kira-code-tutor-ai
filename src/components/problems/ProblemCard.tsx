
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp, Check, Code, Lightbulb, RefreshCcw } from 'lucide-react';
import { toast } from '@/components/ui/use-sonner';

interface ProblemCardProps {
  problem: {
    id: string;
    name: string;
    description: string;
    difficulty: number;
    hint?: string;
  };
  onSubmit?: (solution: string) => void;
}

const difficultyColors: Record<number, string> = {
  1: 'bg-green-500',
  2: 'bg-blue-500',
  3: 'bg-yellow-500',
  4: 'bg-orange-500',
  5: 'bg-red-500',
};

const ProblemCard = ({ problem, onSubmit }: ProblemCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solution, setSolution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!solution.trim()) {
      toast("Please enter your solution", {
        description: "You need to write some code before submitting."
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      onSubmit?.(solution);
      toast("Solution submitted!", {
        description: "Your solution has been submitted for evaluation.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleReset = () => {
    setSolution('');
    toast("Solution cleared", {
      description: "Your solution has been reset."
    });
  };

  return (
    <Card className={`shadow-sm transition-all ${expanded ? 'shadow-md' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{problem.name}</CardTitle>
            <div className="flex items-center mt-1 space-x-2">
              <Badge 
                className={`${difficultyColors[problem.difficulty]} hover:${difficultyColors[problem.difficulty]}`}
              >
                Difficulty: {problem.difficulty}/5
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {expanded && (
        <>
          <CardContent className="space-y-4">
            <CardDescription className="text-foreground whitespace-pre-wrap">
              {problem.description}
            </CardDescription>
            
            {showHint && problem.hint && (
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">Hint:</span> {problem.hint}
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor={`solution-${problem.id}`} className="text-sm font-medium flex items-center gap-2">
                <Code className="h-4 w-4" />
                Your Solution:
              </label>
              <Textarea
                id={`solution-${problem.id}`}
                placeholder="Write your code solution here..."
                className="font-mono text-sm h-32"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                <RefreshCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Submit
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ProblemCard;
