
import { projects } from '@/lib/data';
import ProjectCard from './project-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const ProjectShowcase = () => {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
        <Tabs defaultValue="embedded" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
            <TabsTrigger value="embedded">Embedded Systems</TabsTrigger>
            <TabsTrigger value="web">Web Development</TabsTrigger>
          </TabsList>
          <TabsContent value="embedded">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {projects.embedded.map((project, index) => (
                <ProjectCard key={index} {...project} animationSeed={index * 0.2} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="web">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {projects.web.map((project, index) => (
                <ProjectCard key={index} {...project} animationSeed={(projects.embedded.length + index) * 0.2} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProjectShowcase;
