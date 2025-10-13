import { HeroSection } from "@/components/hero-section";
import { ProjectShowcase } from "@/components/project-showcase";
import { SkillsSection } from "@/components/skills-section";
import { IotDemoSection } from "@/components/iot-demo-section";
import { ContactSection } from "@/components/contact-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ProjectShowcase />
      <div className="container mx-auto px-4 md:px-6">
        <Separator className="my-16 md:my-24" />
      </div>
      <SkillsSection />
      <div className="container mx-auto px-4 md:px-6">
        <Separator className="my-16 md:my-24" />
      </div>
      <IotDemoSection />
       <div className="container mx-auto px-4 md:px-6">
        <Separator className="my-16 md:my-24" />
      </div>
      <ContactSection />
    </div>
  );
}
