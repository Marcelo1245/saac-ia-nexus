
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageSquare, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import AirtableService from '@/services/airtableService';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showVoiceflowChat, setShowVoiceflowChat] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  // Initialize Airtable service with provided credentials
  const airtableService = new AirtableService(
    'patMaLVO52wxu3qmm.4023206ec71de3dd23d0df6d61576dba46229b2c54e477cd88b451e11e169704',
    'app70pK6jWQT7UfRw',
    'tbl6oIUsbtTpOAWZR'
  );

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

  const loadVoiceflowWidget = () => {
    setShowVoiceflowChat(true);
    
    // Add Voiceflow script only if it hasn't been loaded yet
    if (!document.getElementById('voiceflow-script')) {
      const script = document.createElement('script');
      script.id = 'voiceflow-script';
      script.type = 'text/javascript';
      script.onload = () => {
        // @ts-ignore
        window.voiceflow?.chat.load({
          verify: { projectID: '67d04783ad9ed2f668b04618' },
          url: 'https://general-runtime.voiceflow.com/',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com/"
          },
          render: {
            mode: 'embedded',
            target: document.getElementById('voiceflow-container')
          }
        });
      };
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      document.head.appendChild(script);
    } else {
      // If script already loaded, just initialize the widget
      // @ts-ignore
      window.voiceflow?.chat.load({
        verify: { projectID: '67d04783ad9ed2f668b04618' },
        url: 'https://general-runtime.voiceflow.com/',
        versionID: 'production',
        voice: {
          url: "https://runtime-api.voiceflow.com/"
        },
        render: {
          mode: 'embedded',
          target: document.getElementById('voiceflow-container')
        }
      });
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Olá, vi sobre a SAAC.IA e me interessei em como automatizar meu processo de agendamento de reuniões, gostaria de saber mais");
    const whatsappUrl = `https://wa.me/5548998159763?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Por favor, preencha pelo menos o nome e email');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to Airtable automatically
      await airtableService.createRecord({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
      });

      toast.success('Mensagem enviada com sucesso!');

      // Clear form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      });

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        {showVoiceflowChat ? (
          <div className="glass-card rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Agende sua conversa</h3>
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowVoiceflowChat(false)}
              >
                Voltar
              </Button>
            </div>
            
            <div id="voiceflow-container" className="bg-saac-grafite/50 rounded-lg p-4 min-h-[400px]">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Carregando assistente virtual...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              className={`glass-card rounded-xl p-8 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                Solicite uma demonstração
              </h3>
              
              <Button 
                type="button"
                className="w-full bg-gradient-blue hover:opacity-90 mb-6 flex items-center justify-center gap-2"
                onClick={loadVoiceflowWidget}
              >
                <Calendar className="h-5 w-5" />
                Agendar Demonstração
              </Button>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-gray-300">Nome completo</label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Seu nome" 
                      className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-300">E-mail corporativo</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email" 
                      placeholder="seu@email.com" 
                      className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm text-gray-300">Empresa</label>
                    <Input 
                      id="company"
                      name="company"
                      placeholder="Nome da empresa" 
                      className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm text-gray-300">Telefone</label>
                    <Input 
                      id="phone"
                      name="phone"
                      placeholder="(00) 00000-0000" 
                      className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-gray-300">Mensagem</label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="Como podemos ajudar sua empresa?" 
                    className="bg-saac-grafite/50 border-gray-700 focus:border-saac-blue"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-blue hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
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
                      <a href="mailto:ContatoComercial@saacia.com" className="text-gray-300 hover:text-saac-blue transition-colors">
                        ContatoComercial@saacia.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-saac-blue/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5 text-saac-blue" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Telefone Suporte</h4>
                      <a href="tel:+5548998159763" className="text-gray-300 hover:text-saac-blue transition-colors">
                        +55 (48) 99815-9763
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-saac-blue/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-saac-blue" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">WhatsApp</h4>
                      <button 
                        onClick={handleWhatsAppRedirect}
                        className="text-gray-300 hover:text-saac-blue transition-colors cursor-pointer"
                      >
                        Iniciar conversa
                      </button>
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
                  className="w-full bg-saac-blue/20 text-saac-blue hover:bg-saac-blue/30 border border-saac-blue/50 flex items-center justify-center gap-2"
                  onClick={loadVoiceflowWidget}
                >
                  <Calendar className="h-5 w-5" />
                  Agendar Reunião
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
