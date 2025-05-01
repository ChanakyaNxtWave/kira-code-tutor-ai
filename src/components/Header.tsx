
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, BarChart3, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-kira-primary" />
          <span className="font-bold text-xl">Kira AI Tutor</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-primary font-medium">
            Home
          </Link>
          <Link to="/problems" className="text-foreground hover:text-primary font-medium">
            Problems
          </Link>
          <Link to="/concepts" className="text-foreground hover:text-primary font-medium">
            Concepts
          </Link>
          <Link to="/teacher" className="text-foreground hover:text-primary font-medium">
            Teacher View
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
          <Button size="icon" variant="ghost" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
