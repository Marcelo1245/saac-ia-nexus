
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-saac-dark"
    >
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saac-blue/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saac-blue/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-white">Entre em </span>
            <span className="text-gradient-blue">Contato</span>
          </h2>
          
          <p 
            className={`text-gray-300 text-lg leading-relaxed transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Estamos prontos para revolucionar sua estratégia de prospecção. Fale com um especialista hoje mesmo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            className={`glass-card rounded-xl p-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Solicite uma demonstração</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-300">Nome completo</label>
                  <Input 
                    id="name" 
                    placeholder="Seu nome" 
                    className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-300">E-mail corporativo</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm text-gray-300">Empresa</label>
                  <Input 
                    id="company" 
                    placeholder="Nome da empresa" 
                    className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm text-gray-300">Telefone</label>
                  <Input 
                    id="phone" 
                    placeholder="(00) 00000-0000" 
                    className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-300">Mensagem</label>
                <Textarea 
                  id="message" 
                  placeholder="Como podemos ajudar sua empresa?" 
                  className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                  rows={4}
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-blue hover:opacity-90"
              >
                Solicitar Demonstração
              </Button>
              
              <p className="text-xs text-gray-400 text-center">
                Ao enviar, você concorda com nossa política de privacidade e termos de uso.
              </p>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8 lg:pl-8">
            <div 
              className={`transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Entre em contato diretamente</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-saac-blue/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-saac-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <a href="mailto:contato@saacia.com.br" className="text-gray-300 hover:text-saac-blue transition-colors">
                      contato@saacia.com.br
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-saac-blue/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-saac-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Telefone</h4>
                    <a href="tel:+551199999-9999" className="text-gray-300 hover:text-saac-blue transition-colors">
                      +55 (11) 99999-9999
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-saac-blue/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-saac-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">WhatsApp</h4>
                    <a href="https://wa.me/5511999999999" className="text-gray-300 hover:text-saac-blue transition-colors">
                      Iniciar conversa
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className={`glass-card rounded-xl p-8 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Agende uma reunião</h3>
              
              <p className="text-gray-300 mb-6">
                Prefere escolher um horário específico? Agende diretamente uma reunião com um de nossos especialistas.
              </p>
              
              <Button 
                className="w-full bg-saac-blue/20 text-saac-blue hover:bg-saac-blue/30 border border-saac-blue/50"
              >
                Agendar Reunião
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
