
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Instagram } from 'lucide-react';

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

  // Ícone do X (Twitter) customizado
  const XIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  // Ícone do Discord customizado
  const DiscordIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
    </svg>
  );

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
              <XIcon />
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
              <DiscordIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
