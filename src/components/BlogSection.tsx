
import React, { useRef, useEffect, useState } from 'react';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BlogSection: React.FC = () => {
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
  
  const blogPosts = [
    {
      title: "Como a IA está revolucionando o processo de vendas B2B",
      excerpt: "Descubra como as empresas estão utilizando inteligência artificial para automatizar e otimizar suas estratégias de prospecção.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=500&q=80",
      date: "18 Abr, 2023",
      category: "Inteligência Artificial",
      icon: TrendingUp
    },
    {
      title: "7 métricas essenciais para avaliar a eficiência do seu funil de vendas",
      excerpt: "Conheça os indicadores mais importantes para medir o desempenho da sua estratégia de captação e conversão de leads.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500&q=80",
      date: "03 Mar, 2023",
      category: "Métricas de Vendas",
      icon: Calendar
    },
    {
      title: "O papel do vendedor na era da automação: como se adaptar e prosperar",
      excerpt: "Entenda como os profissionais de vendas podem se reinventar e aproveitar ao máximo as ferramentas de automação comercial.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&h=500&q=80",
      date: "22 Fev, 2023",
      category: "Carreira em Vendas",
      icon: Users
    }
  ];

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #121212, #0c0c14)' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-white">Insights </span>
            <span className="text-gradient-blue">& Blog</span>
          </h2>
          
          <p 
            className={`text-gray-300 text-lg leading-relaxed transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Conteúdo relevante sobre vendas, tecnologia, IA e tendências de prospecção para manter você à frente da concorrência.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl overflow-hidden transition-all duration-700 group hover:border-saac-blue/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-saac-dark/80 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-saac-blue/10 flex items-center justify-center mr-3">
                    <post.icon className="w-4 h-4 text-saac-blue" />
                  </div>
                  <span className="text-xs text-saac-blue">{post.category}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-saac-blue transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4">
                  {post.excerpt}
                </p>
                
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-saac-blue text-sm font-medium hover:underline"
                >
                  Leia mais
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button 
              variant="outline" 
              className="border-saac-blue text-saac-blue hover:bg-saac-blue/20"
            >
              Ver todos os artigos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
