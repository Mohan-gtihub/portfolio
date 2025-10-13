import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ProjectCard } from "./project-card";

export function ProjectShowcase() {
  const projects = PlaceHolderImages as (typeof PlaceHolderImages[0] & { title: string; techStack: string[], description: string })[];

  return (
    <section id="projects" className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="flex flex-col items-start space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Project Showcase</h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          A selection of my work in embedded systems and web development.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
