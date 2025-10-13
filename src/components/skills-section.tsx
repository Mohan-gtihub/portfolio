"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { skills as skillsData } from '@/lib/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Skill = {
    name: string;
    level: number;
    icon: React.ElementType;
    description: string;
};

type SkillCategory = keyof typeof skillsData;

const SkillBar = ({ name, level, icon: Icon, description }: Skill) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(level), 100);
        return () => clearTimeout(timer);
    }, [level]);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="w-full text-left">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Icon className="h-4 w-4 text-primary" />
                            <span>{name}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export function SkillsSection() {
    return (
        <section id="skills" className="container mx-auto px-4 md:px-6 py-12 md:py-24">
            <div className="flex flex-col items-start space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical Skills</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    A snapshot of the technologies and tools I work with across hardware and software.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
                {Object.keys(skillsData).map((category) => (
                    <Card key={category}>
                        <CardHeader>
                            <CardTitle>{category}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {(skillsData[category as SkillCategory] as Skill[]).map((skill) => (
                                <SkillBar key={skill.name} {...skill} />
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
