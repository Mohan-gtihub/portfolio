'use client';
import { skills } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle2 } from 'lucide-react';

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-muted/20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
          {Object.entries(skills).map(([category, skillList]) => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger className="text-xl hover:no-underline">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pt-4">
                  {(skillList as { name: string; description: string }[]).map((skill, index) => (
                     <li key={index} className="flex gap-3">
                       <CheckCircle2 className="text-accent mt-1 h-5 w-5 flex-shrink-0" />
                       <div>
                         <h4 className="font-semibold">{skill.name}</h4>
                         <p className="text-sm text-muted-foreground">{skill.description}</p>
                       </div>
                     </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default SkillsSection;
