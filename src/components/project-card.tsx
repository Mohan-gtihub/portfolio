"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ImagePlaceholder & { title: string; techStack: string[]; description: string };
};

function PerformanceStats() {
    const [stats, setStats] = useState({
      uptime: 99.9,
      loadTime: 150,
      status: "Operational"
    });
  
    useEffect(() => {
      const interval = setInterval(() => {
        const isOperational = Math.random() > 0.02;
        setStats({
          uptime: isOperational ? 99.8 + Math.random() * 0.2 : 0,
          loadTime: isOperational ? 140 + Math.random() * 20 : 0,
          status: isOperational ? "Operational" : "Down"
        });
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    const isWebsiteProject = stats.loadTime > 0;
  
    return isWebsiteProject ? (
      <div className="text-xs text-muted-foreground flex items-center gap-4">
        <div className="flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-full", stats.status === "Operational" ? "bg-green-500" : "bg-red-500")}></span>
            <span>{stats.status}</span>
        </div>
        <span>Uptime: {stats.uptime.toFixed(3)}%</span>
        <span>Load: {stats.loadTime.toFixed(0)}ms</span>
      </div>
    ) : null;
}


export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="relative aspect-video w-full">
            <Image
                src={project.imageUrl}
                alt={project.description}
                fill
                className="object-cover rounded-md"
                data-ai-hint={project.imageHint}
            />
        </div>
        <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <PerformanceStats />
      </CardFooter>
    </Card>
  );
}
