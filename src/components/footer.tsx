import { contact } from '@/lib/data';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Mohan Kilari. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
            <Linkedin size={20} />
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
