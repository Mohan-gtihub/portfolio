'use client';
import { skills } from '@/lib/data';
import SkillCube from './skill-cube';

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-muted/20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-20">Technical Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <SkillCube key={category} category={category} skills={skillList as { name: string; description: string }[]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
