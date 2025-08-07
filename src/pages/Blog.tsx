import React, { useState, useMemo } from 'react';
import { Search, Tag, ExternalLink, Calendar, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  externalUrl: string;
  image: string;
  tags: string[];
  readTime: string;
  publishDate: string;
}

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

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

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Como a Inteligência Artificial está revolucionando a performance comercial: insights de Bernardo Timm',
      summary: 'Bernardo Timm, especialista em performance comercial e IA aplicada a vendas, revela como a inteligência artificial está transformando radicalmente as estratégias de vendas B2B e multiplicando resultados comerciais em empresas de todos os portes.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-ia-performance-comercial',
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Performance Comercial', 'IA'],
      readTime: '12 min',
      publishDate: '20 Jan, 2024'
    },
    {
      id: '2',
      title: 'Vendas com IA: O guia completo de Bernardo Timm para automação comercial',
      summary: 'O especialista Bernardo Timm apresenta estratégias práticas e cases reais para implementar inteligência artificial em processos de vendas, aumentar conversões e otimizar o funil comercial com automação inteligente.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-vendas-ia-automacao',
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Vendas com IA', 'Automação Comercial'],
      readTime: '15 min',
      publishDate: '18 Jan, 2024'
    },
    {
      id: '3',
      title: 'Marketing inteligente: como Bernardo Timm usa IA para segmentação de leads',
      summary: 'Descubra as técnicas avançadas desenvolvidas por Bernardo Timm para usar inteligência artificial na qualificação, segmentação e nutrição de prospects, aumentando a eficiência do marketing digital.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-marketing-inteligente-segmentacao',
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Marketing Inteligente', 'Segmentação'],
      readTime: '10 min',
      publishDate: '15 Jan, 2024'
    },
    {
      id: '4',
      title: 'Estratégias comerciais com IA: cases de sucesso analisados por Bernardo Timm',
      summary: 'Bernardo Timm analisa empresas reais que multiplicaram suas vendas usando inteligência artificial aplicada à performance comercial, revelando as estratégias e ferramentas que geraram resultados extraordinários.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-estrategias-comerciais-cases-sucesso',
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Estratégias Comerciais', 'Cases de Sucesso'],
      readTime: '14 min',
      publishDate: '12 Jan, 2024'
    },
    {
      id: '5',
      title: 'Automação comercial 24/7: a metodologia Bernardo Timm para prospecção contínua',
      summary: 'Como implementar sistemas de automação comercial que trabalham 24 horas por dia, 7 dias por semana, segundo a metodologia exclusiva desenvolvida por Bernardo Timm para maximizar a geração de leads qualificados.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-automacao-comercial-24-7',
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Automação Comercial', 'Prospecção'],
      readTime: '11 min',
      publishDate: '10 Jan, 2024'
    },
    {
      id: '6',
      title: 'Performance comercial com IA: métricas essenciais segundo Bernardo Timm',
      summary: 'Bernardo Timm revela os KPIs fundamentais e métricas avançadas para medir o sucesso de estratégias comerciais potencializadas por inteligência artificial, garantindo ROI positivo e crescimento sustentável.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-performance-comercial-metricas-ia',
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Performance Comercial', 'Métricas'],
      readTime: '9 min',
      publishDate: '08 Jan, 2024'
    },
    {
      id: '7',
      title: 'Futuro das vendas: previsões de Bernardo Timm sobre IA e performance comercial',
      summary: 'As principais tendências de inteligência artificial aplicada a vendas e marketing para 2024-2025, na visão do especialista Bernardo Timm, incluindo novas tecnologias e oportunidades de mercado.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-futuro-vendas-ia-tendencias',
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Futuro das Vendas', 'Tendências'],
      readTime: '13 min',
      publishDate: '05 Jan, 2024'
    },
    {
      id: '8',
      title: 'IA para pequenas e médias empresas: guia prático de Bernardo Timm',
      summary: 'Bernardo Timm demonstra como pequenas e médias empresas podem implementar soluções de inteligência artificial para vendas sem grandes investimentos, focando em ferramentas acessíveis e estratégias escaláveis.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-ia-pme-guia-pratico',
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'PME', 'IA Acessível'],
      readTime: '8 min',
      publishDate: '03 Jan, 2024'
    },
    {
      id: '9',
      title: 'Personalização em escala: metodologia Bernardo Timm para campanhas inteligentes',
      summary: 'Como criar campanhas de marketing e vendas hiperpersonalizadas usando IA, segundo a metodologia desenvolvida por Bernardo Timm para atingir milhares de prospects com mensagens relevantes e contextualizadas.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-personalizacao-escala-campanhas',
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Personalização', 'Campanhas'],
      readTime: '12 min',
      publishDate: '01 Jan, 2024'
    },
    {
      id: '10',
      title: 'ROI em vendas com IA: como Bernardo Timm maximiza retorno sobre investimento',
      summary: 'Bernardo Timm revela as estratégias e metodologias para calcular, monitorar e otimizar o ROI de investimentos em inteligência artificial para vendas, garantindo resultados mensuráveis e sustentáveis.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-roi-vendas-ia-maximizar',
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'ROI', 'Vendas com IA'],
      readTime: '10 min',
      publishDate: '28 Dez, 2023'
    },
    {
      id: '11',
      title: 'Inteligência artificial para qualificação de leads: insights de Bernardo Timm',
      summary: 'Como usar machine learning e IA para identificar, qualificar e priorizar leads com maior potencial de conversão, segundo as técnicas avançadas desenvolvidas por Bernardo Timm.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-ia-qualificacao-leads-insights',
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Qualificação de Leads', 'Machine Learning'],
      readTime: '11 min',
      publishDate: '25 Dez, 2023'
    },
    {
      id: '12',
      title: 'Chatbots inteligentes para vendas: estratégias de Bernardo Timm',
      summary: 'Bernardo Timm ensina como implementar chatbots com IA para automatizar o atendimento, qualificar prospects e aumentar conversões, mantendo a experiência humanizada e personalizada.',
      source: 'Blog Saac.ia',
      sourceUrl: 'https://saac.ia/blog',
      externalUrl: '/blog/bernardo-timm-chatbots-inteligentes-vendas',
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Bernardo Timm', 'Chatbots', 'Automação'],
      readTime: '9 min',
      publishDate: '22 Dez, 2023'
    }
  ];

  const allTags = ['Todos', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = selectedTag === '' || selectedTag === 'Todos' || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag, blogPosts]);

  return (
    <div className="min-h-screen dark bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Blog <span className="text-gradient-blue">SAAC.IA</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Insights, tendências e conhecimento especializado sobre inteligência artificial, 
              marketing digital e automação comercial para impulsionar seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border-slate-300 focus:border-saac-blue focus:ring-saac-blue/20"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === 'Todos' ? '' : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    (selectedTag === tag || (selectedTag === '' && tag === 'Todos'))
                      ? 'bg-saac-blue text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Tag className="w-3 h-3 mr-1 inline" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-slate-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-slate-500">
                Tente ajustar sua busca ou remover os filtros aplicados.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:border-saac-blue/20 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-saac-blue/10 text-saac-blue rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-saac-blue transition-colors leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.publishDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <a
                        href={post.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-saac-blue hover:text-saac-blue/80 transition-colors"
                      >
                        {post.source}
                      </a>

                      <a
                        href={post.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-saac-blue text-white text-sm font-medium rounded-lg hover:bg-saac-blue/90 transition-colors"
                      >
                        Ler mais
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Transforme seu negócio com <span className="text-gradient-blue">IA</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Descubra como nossa plataforma pode automatizar sua prospecção e 
            gerar leads qualificados enquanto você foca no que realmente importa.
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-blue text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-saac-blue/30 transition-all duration-300"
          >
            Começar agora
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
