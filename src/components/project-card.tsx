import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string;
  imageSeed: string;
}

const ProjectCard = ({ name, description, tech, imageSeed }: ProjectCardProps) => {
  const techStack = tech.split(',').map(t => t.trim());

  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2 overflow-hidden">
      <div className="relative w-full h-48">
        <Image 
          src={`https://picsum.photos/seed/${imageSeed}/600/400`}
          alt={`${name} project image`}
          fill
          style={{ objectFit: 'cover' }}
          data-ai-hint="circuit board technology"
        />
      </div>
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
