import { skills } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2 } from 'lucide-react';

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {(skillList as { name: string; description: string }[]).map((skill, index) => (
                    <li key={index} className="flex gap-4">
                      <CheckCircle2 className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
