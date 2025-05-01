
import { Link } from 'react-router-dom';
import { GraduationCap, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-kira-primary" />
              <span className="font-bold text-lg">Kira AI Tutor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Personalized AI tutoring for data structures and algorithms.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/concepts" className="text-muted-foreground hover:text-foreground">
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link to="/problems" className="text-muted-foreground hover:text-foreground">
                  Practice Problems
                </Link>
              </li>
              <li>
                <Link to="/visualizations" className="text-muted-foreground hover:text-foreground">
                  Algorithm Visualizations
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kira AI Tutor. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
