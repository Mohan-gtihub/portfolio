
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string;
  animationSeed: number;
}

const ProjectCard = ({ name, description, tech, animationSeed }: ProjectCardProps) => {
  const techStack = tech.split(',').map(t => t.trim());

  return (
    <Card className="project-card flex flex-col transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
      <div className="project-card-grid" style={{ animationDelay: `${-animationSeed}s` }} />
      <div className="relative z-10 bg-background/50 backdrop-blur-sm h-full flex flex-col">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="text-foreground/80">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end">
          <div className="flex flex-wrap gap-2">
            {techStack.map(t => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProjectCard;
