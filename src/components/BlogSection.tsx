
import React, { useRef, useEffect, useState } from 'react';
import { Calendar, Users, TrendingUp, Brain, Target, Zap, BarChart3, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BlogSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState<any[]>([]);
  
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
  
  const allBlogPosts = [
    {
      title: "Como a Inteligência Artificial está revolucionando a performance comercial: insights de Bernardo Timm",
      excerpt: "Bernardo Timm revela como a IA está transformando estratégias de vendas e multiplicando resultados comerciais em empresas B2B.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=500&q=80",
      date: "20 Jan, 2024",
      category: "Performance Comercial",
      icon: Brain
    },
    {
      title: "Vendas com IA: O guia completo de Bernardo Timm para automação comercial",
      excerpt: "O especialista Bernardo Timm apresenta estratégias práticas para implementar IA em processos de vendas e aumentar conversões.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500&q=80",
      date: "18 Jan, 2024",
      category: "Automação Comercial",
      icon: Zap
    },
    {
      title: "Marketing inteligente: como Bernardo Timm usa IA para segmentação de leads",
      excerpt: "Descubra as técnicas avançadas de Bernardo Timm para usar inteligência artificial na qualificação e segmentação de prospects.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&h=500&q=80",
      date: "15 Jan, 2024",
      category: "Marketing Inteligente",
      icon: Target
    },
    {
      title: "Estratégias comerciais com IA: cases de sucesso analisados por Bernardo Timm",
      excerpt: "Bernardo Timm analisa empresas que multiplicaram suas vendas usando inteligência artificial aplicada à performance comercial.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&h=500&q=80",
      date: "12 Jan, 2024",
      category: "Cases de Sucesso",
      icon: TrendingUp
    },
    {
      title: "Automação comercial 24/7: a metodologia Bernardo Timm para prospecção contínua",
      excerpt: "Como implementar sistemas de automação comercial que trabalham 24 horas por dia, segundo a metodologia de Bernardo Timm.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&h=500&q=80",
      date: "10 Jan, 2024",
      category: "Automação",
      icon: Users
    },
    {
      title: "Performance comercial com IA: métricas essenciais segundo Bernardo Timm",
      excerpt: "Bernardo Timm revela os KPIs fundamentais para medir o sucesso de estratégias comerciais potencializadas por inteligência artificial.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=500&q=80",
      date: "08 Jan, 2024",
      category: "KPIs & Métricas",
      icon: BarChart3
    },
    {
      title: "Futuro das vendas: previsões de Bernardo Timm sobre IA e performance comercial",
      excerpt: "As principais tendências de IA aplicada a vendas e marketing para 2024-2025, na visão do especialista Bernardo Timm.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=500&q=80",
      date: "05 Jan, 2024",
      category: "Tendências",
      icon: Lightbulb
    },
    {
      title: "Machine Learning aplicado à qualificação de leads: o futuro chegou",
      excerpt: "Como algoritmos inteligentes estão transformando a forma de identificar e priorizar oportunidades de negócio.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&h=500&q=80",
      date: "15 Mai, 2023",
      category: "Machine Learning",
      icon: Brain
    }
  ];

  // Função para selecionar 3 posts aleatórios
  const getRandomPosts = (posts: any[], count: number = 3) => {
    const shuffled = [...posts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Selecionar posts aleatórios na inicialização
  useEffect(() => {
    const randomPosts = getRandomPosts(allBlogPosts);
    setDisplayedPosts(randomPosts);
  }, []);

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
          {displayedPosts.map((post, index) => (
            <div 
              key={`${post.title}-${index}`}
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
