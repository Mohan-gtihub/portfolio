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
  // We'll split skills for different faces of the cube
  const half = Math.ceil(skills.length / 2);
  const firstHalf = skills.slice(0, half);
  const secondHalf = skills.slice(half);

  return (
    <div className="scene w-full h-[250px]">
      <div className="cube">
        <div className="cube__face cube__face--front text-center">
          <h3 className="text-2xl font-bold text-primary">{category}</h3>
          <p className="mt-4 text-muted-foreground">Hover to see skills</p>
        </div>
        <div className="cube__face cube__face--left items-start overflow-y-auto p-6">
          <ul className="space-y-4">
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
        {/* The right face is what is seen during transition from front to left */}
        <div className="cube__face cube__face--right" />
      </div>
    </div>
  );
};

export default SkillCube;
