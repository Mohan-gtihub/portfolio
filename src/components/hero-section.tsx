import Hero3D from './hero-3d';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <Hero3D />
      <div className="container px-4 md:px-6 text-center z-10">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Kilari Tech Solutions
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
            Innovating at the intersection of embedded systems and web technology.
            <br />
            Crafting the future, from silicon to screen.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
