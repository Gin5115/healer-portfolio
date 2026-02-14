import { DashboardLayout } from './layouts/DashboardLayout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Background } from './pages/Background';
import { Recognitions } from './pages/Recognitions';
import { Contact } from './pages/Contact';
import { SectionWrapper } from './components/ui/SectionWrapper';

function App() {
  return (
    <DashboardLayout>
      <SectionWrapper id="home" className="min-h-screen flex items-center justify-center">
        <Home />
      </SectionWrapper>

      <SectionWrapper id="about">
        <About />
      </SectionWrapper>

      <SectionWrapper id="background">
        <Background />
      </SectionWrapper>

      <SectionWrapper id="projects">
        <Projects />
      </SectionWrapper>

      <SectionWrapper id="recognitions">
        <Recognitions />
      </SectionWrapper>

      <SectionWrapper id="contact">
        <Contact />
      </SectionWrapper>

      <footer className="py-6 text-center text-xs text-text-muted border-t border-border-color mt-20">
        <p>&copy; {new Date().getFullYear()} Sathishkumar R. Built with React & Tailwind.</p>
      </footer>
    </DashboardLayout>
  );
}

export default App;
