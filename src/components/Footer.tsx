
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Twitter, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

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
  };

  return (
    <footer className="bg-[#0a0a10] text-gray-400 py-12 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saac-blue/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-bold">
              <span className="text-gradient-blue">SAAC</span>
              <span className="text-white">.IA</span>
            </Link>
            
            <p className="text-sm">
              Sistema Automatizado de Alcance e Prospecção Inteligente com IA que automatiza a prospecção de leads em massa.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-saac-blue transition-colors cursor-pointer text-left">
                  Sobre nós
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-saac-blue transition-colors cursor-pointer text-left">
                  Contato
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('solution')} className="hover:text-saac-blue transition-colors cursor-pointer text-left">
                  Solução
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-saac-blue transition-colors cursor-pointer text-left">
                  Como funciona
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('results')} className="hover:text-saac-blue transition-colors cursor-pointer text-left">
                  Resultados
                </button>
              </li>
              <li>
                <Link to="/blog" className="hover:text-saac-blue transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/terms" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-saac-blue transition-colors"
                >
                  Termos de serviço
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-saac-blue transition-colors"
                >
                  Políticas de privacidade
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-saac-blue transition-colors"
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SAAC.IA. Todos os direitos reservados.
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://x.com/saac_ia" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-saac-blue transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/saacia.ia/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-saac-blue transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://discord.gg/NgQKw6pG" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-saac-blue transition-colors"
              aria-label="Discord"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
