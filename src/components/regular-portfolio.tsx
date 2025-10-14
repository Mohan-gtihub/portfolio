import Header from './header';
import HeroSection from './hero-section';
import SkillsSection from './skills-section';
import ProjectShowcase from './project-showcase';
import ContactSection from './contact-section';
import Footer from './footer';

const RegularPortfolio = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SkillsSection />
        <ProjectShowcase />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default RegularPortfolio;
