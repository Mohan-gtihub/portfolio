'use client';

import { CheckCircle2 } from "lucide-react";

interface Skill {
  name: string;
  description: string;
}

interface SkillCubeProps {
  category: string;
  skills: Skill[];
}

const SkillCube = ({ category, skills }: SkillCubeProps) => {
  return (
    <div className="scene w-full h-[250px]">
      <div className="cube">
        <div className="cube__face cube__face--front text-center">
          <h3 className="text-2xl font-bold text-primary">{category}</h3>
          <p className="mt-4 text-muted-foreground">Hover to see skills</p>
        </div>
        <div className="cube__face cube__face--left items-start p-6">
          <ul className="space-y-4 h-full overflow-y-auto">
            {skills.map((skill, index) => (
               <li key={index} className="flex gap-3">
                 <CheckCircle2 className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold">{skill.name}</h4>
                   <p className="text-sm text-muted-foreground">{skill.description}</p>
                 </div>
               </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillCube;
