
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    // Se estamos na página inicial, navegar para lá primeiro
    if (window.location.pathname !== '/') {
      navigate('/');
      // Aguardar a navegação e então fazer scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Se já estamos na página inicial, apenas fazer scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-saac-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            <span className="text-gradient-blue">SAAC</span>.IA
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-saac-blue cursor-pointer transition-colors">
            Sobre
          </button>
          <button onClick={() => scrollToSection('solution')} className="text-gray-300 hover:text-saac-blue cursor-pointer transition-colors">
            Solução
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-saac-blue cursor-pointer transition-colors">
            Como Funciona
          </button>
          <button onClick={() => scrollToSection('ecosystem')} className="text-gray-300 hover:text-saac-blue cursor-pointer transition-colors">
            Ecossistema
          </button>
          <button onClick={() => scrollToSection('results')} className="text-gray-300 hover:text-saac-blue cursor-pointer transition-colors">
            Resultados
          </button>
          <Link to="/blog" className="text-gray-300 hover:text-saac-blue transition-colors">
            Blog
          </Link>
          <Link to="/client-area" className="text-gray-300 hover:text-saac-blue transition-colors">
            <span className="flex items-center">
              <User size={16} className="mr-1" />
              Área do Cliente
            </span>
          </Link>
          <Button 
            onClick={() => scrollToSection('contact')} 
            className="bg-gradient-blue hover:opacity-90 text-white shadow-lg" 
            size="sm"
          >
            Contato
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-saac-dark/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="flex flex-col space-y-4 px-6 pb-6">
          <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-saac-blue py-2 cursor-pointer text-left">
            Sobre
          </button>
          <button onClick={() => scrollToSection('solution')} className="text-gray-300 hover:text-saac-blue py-2 cursor-pointer text-left">
            Solução
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-saac-blue py-2 cursor-pointer text-left">
            Como Funciona
          </button>
          <button onClick={() => scrollToSection('ecosystem')} className="text-gray-300 hover:text-saac-blue py-2 cursor-pointer text-left">
            Ecossistema
          </button>
          <button onClick={() => scrollToSection('results')} className="text-gray-300 hover:text-saac-blue py-2 cursor-pointer text-left">
            Resultados
          </button>
          <Link to="/blog" className="text-gray-300 hover:text-saac-blue py-2">
            Blog
          </Link>
          <Link to="/client-area" className="text-gray-300 hover:text-saac-blue py-2">
            <span className="flex items-center">
              <User size={16} className="mr-1" />
              Área do Cliente
            </span>
          </Link>
          <Button 
            onClick={() => scrollToSection('contact')} 
            className="bg-gradient-blue hover:opacity-90 text-white w-full"
          >
            Contato
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
