import { about } from '@/lib/data';
import { Button } from './ui/button';
import { ArrowDown, FileText } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="about" className="py-20 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Mohan Kilari</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">Embedded Systems & IoT Developer</p>
        <p className="max-w-3xl mx-auto mb-8">{about}</p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <a href="#projects">
              View Projects <ArrowDown className="ml-2" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              View Resume <FileText className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
