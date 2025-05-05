
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroAnimation from './HeroAnimation';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const parallaxElements = sectionRef.current.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element: Element) => {
        const speed = Number((element as HTMLElement).dataset.speed || 0.2);
        (element as HTMLElement).style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: 'radial-gradient(circle at 50% 50%, #1A1A2E, #121212)' }}
    >
      {/* Background particles effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-saac-blue/30 blur-[100px] animate-pulse-blue"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-saac-neon/20 blur-[100px] animate-pulse-blue"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:space-y-8 parallax" data-speed="0.1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              <span className="text-white">Prospecção Inteligente</span>
              <br />
              <span className="text-gradient-blue">Automatizada 24/7</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              O sistema de IA que <span className="text-white font-medium">captura, qualifica e agenda reuniões</span> de forma 100% automatizada para escalar suas vendas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <Button 
                className="bg-gradient-blue hover:opacity-90 text-white shadow-lg py-6 px-8 rounded-md"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Agendar Demonstração
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                className="border-saac-blue text-saac-blue hover:text-white hover:bg-saac-blue/20 py-6 px-8 rounded-md"
                onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Conhecer Solução
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <HeroAnimation />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-saac-blue text-sm mb-2">Saiba mais</span>
        <svg 
          className="w-6 h-6 text-saac-blue" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
