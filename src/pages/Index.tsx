
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
import ChatbotWidget from "@/components/ChatbotWidget";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen dark bg-saac-dark">
      <Navbar />
      <main>
        <HeroSection />
        <div className="container mx-auto py-8 flex justify-center">
          <Link to="/auth/login">
            <Button className="bg-gradient-blue text-white px-8 py-2 rounded-full shadow-lg hover:shadow-saac-blue/30 transition-all duration-300 font-medium">
              Acessar Área do Cliente
            </Button>
          </Link>
        </div>
        <AboutSection />
        <SolutionSection />
        <HowItWorksSection />
        <ResultsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
