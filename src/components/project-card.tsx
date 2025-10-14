import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string;
}

const ProjectCard = ({ name, description, tech }: ProjectCardProps) => {
  const techStack = tech.split(',').map(t => t.trim());

  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <div className="flex flex-wrap gap-2">
          {techStack.map(t => (
            <Badge key={t} variant="secondary">{t}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
