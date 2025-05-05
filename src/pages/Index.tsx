
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ResultsSection from "@/components/ResultsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen dark bg-saac-dark">
      <Navbar />
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 md:flex-row">
        <Link to="/client-area">
          <Button className="bg-gray-800 hover:bg-gray-700 shadow-lg w-full" size="lg">
            <User className="mr-2 h-4 w-4" />
            Área do Cliente
          </Button>
        </Link>
        <Link to="/auth/login">
          <Button className="bg-saac-blue hover:bg-blue-700 shadow-lg" size="lg">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Acessar Dashboard
          </Button>
        </Link>
      </div>
      <main>
        <HeroSection />
        <AboutSection />
        <SolutionSection />
        <HowItWorksSection />
        <ResultsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
