
import React, { useState, useMemo } from 'react';
import { Search, Tag, ExternalLink, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '5 maneiras de usar IA para potencializar seu marketing de conteúdo',
      summary: 'Descubra como a inteligência artificial pode revolucionar sua estratégia de marketing digital e aumentar o engajamento com seu público.',
      source: 'Forbes Brasil',
      sourceUrl: 'https://forbes.com.br',
      externalUrl: '#',
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['IA', 'Marketing'],
      readTime: '5 min',
      publishDate: '15 Jan, 2024'
    },
    {
      id: '2',
      title: 'Integre a IA à produção de conteúdo para blogs no seu negócio de e-commerce',
      summary: 'Aprenda a implementar ferramentas de IA para criar conteúdo relevante e otimizado que converte visitantes em clientes.',
      source: 'E-Commerce Brasil',
      sourceUrl: 'https://ecommercebrasil.com.br',
      externalUrl: '#',
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['IA', 'E-commerce'],
      readTime: '7 min',
      publishDate: '12 Jan, 2024'
    },
    {
      id: '3',
      title: 'Como a IA pode me ajudar a criar melhores posts?',
      summary: 'Explore técnicas avançadas de criação de conteúdo com IA para aumentar o alcance e engajamento nas redes sociais.',
      source: 'Reportei',
      sourceUrl: 'https://reportei.com.br',
      externalUrl: '#',
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['IA', 'Marketing'],
      readTime: '6 min',
      publishDate: '10 Jan, 2024'
    },
    {
      id: '4',
      title: 'Conteúdo criado por IA: o que o Google pensa sobre isso',
      summary: 'Entenda as diretrizes do Google sobre conteúdo gerado por IA e como criar material que seja bem rankeado nos resultados de busca.',
      source: 'WebShare',
      sourceUrl: 'https://webshare.com.br',
      externalUrl: '#',
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['SEO', 'IA'],
      readTime: '8 min',
      publishDate: '08 Jan, 2024'
    },
    {
      id: '5',
      title: '5 melhores ferramentas de inteligência artificial para blogs',
      summary: 'Conheça as principais ferramentas de IA que podem transformar seu processo de criação de conteúdo e otimizar sua produtividade.',
      source: 'Blogueira Inteligente',
      sourceUrl: 'https://blogueirainteligente.com.br',
      externalUrl: '#',
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Ferramentas', 'IA'],
      readTime: '6 min',
      publishDate: '05 Jan, 2024'
    },
    {
      id: '6',
      title: 'Interesse dos brasileiros por IA cresceu 65% em um ano',
      summary: 'Análise completa sobre o crescimento do interesse em inteligência artificial no Brasil e as oportunidades de mercado.',
      source: 'E-Commerce Brasil',
      sourceUrl: 'https://ecommercebrasil.com.br',
      externalUrl: '#',
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['IA', 'Marketing'],
      readTime: '5 min',
      publishDate: '03 Jan, 2024'
    },
    {
      id: '7',
      title: 'Marketing de conteúdo SEO é eficaz entre empreendedores',
      summary: 'Descubra por que o marketing de conteúdo otimizado para SEO é a estratégia preferida dos empreendedores de sucesso.',
      source: 'E-Commerce Brasil',
      sourceUrl: 'https://ecommercebrasil.com.br',
      externalUrl: '#',
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['SEO', 'Marketing'],
      readTime: '7 min',
      publishDate: '01 Jan, 2024'
    },
    {
      id: '8',
      title: 'A mão por trás do prompt: o fator humano na criação de conteúdo',
      summary: 'Explore a importância do elemento humano na criação de prompts eficazes e na supervisão da produção de conteúdo com IA.',
      source: 'E-Commerce Brasil',
      sourceUrl: 'https://ecommercebrasil.com.br',
      externalUrl: '#',
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['IA', 'Marketing'],
      readTime: '9 min',
      publishDate: '28 Dez, 2023'
    },
    {
      id: '9',
      title: '5 aplicativos de IA para desenvolver ideias inovadoras',
      summary: 'Descubra aplicativos revolucionários que usam IA para impulsionar a criatividade e gerar ideias disruptivas para seu negócio.',
      source: 'Forbes Brasil',
      sourceUrl: 'https://forbes.com.br',
      externalUrl: '#',
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&h=500&q=80",
      tags: ['Ferramentas', 'IA'],
      readTime: '6 min',
      publishDate: '25 Dez, 2023'
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
          <Link to="/auth/login">
            <Button className="bg-gradient-blue text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-saac-blue/30 transition-all duration-300">
              Começar agora
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
