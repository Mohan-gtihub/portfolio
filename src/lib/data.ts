import { Cpu, Database, Server, Code, Bot, GitBranch, PenTool, Globe } from 'lucide-react';

export const skills = {
  "Embedded Systems": [
    { name: "C/C++", level: 95, icon: Code },
    { name: "Microcontrollers (ARM, ESP32)", level: 90, icon: Cpu },
    { name: "RTOS (FreeRTOS)", level: 80, icon: GitBranch },
    { name: "PCB Design (KiCad)", level: 75, icon: PenTool },
  ],
  "Web Development": [
    { name: "React / Next.js", level: 90, icon: Code },
    { name: "Node.js / TypeScript", level: 85, icon: Server },
    { name: "Databases (SQL/NoSQL)", level: 80, icon: Database },
    { name: "Cloud (AWS/GCP)", level: 70, icon: Globe },
  ],
  "Other Skills": [
    { name: "Python", level: 85, icon: Code },
    { name: "AI/ML Integration", level: 75, icon: Bot },
    { name: "DevOps (Docker, CI/CD)", level: 70, icon: GitBranch },
    { name: "Agile Methodologies", level: 90, icon: GitBranch },
  ]
};
