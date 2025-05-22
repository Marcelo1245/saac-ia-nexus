
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen dark bg-saac-dark">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-saac-blue hover:text-saac-blue/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para página inicial
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Política de Privacidade</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Introdução</h2>
              <p>A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações ao utilizar o site SAAC.IA.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Informações Coletadas</h2>
              <p>Podemos coletar os seguintes tipos de informações:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Informações fornecidas pelo usuário: Nome, e-mail, telefone e empresa ao preencher formulários no site.</li>
                <li>Dados de navegação: Endereço IP, tipo de dispositivo, navegador utilizado, páginas acessadas e tempo de permanência.</li>
                <li>Cookies e tecnologias similares: Para melhorar sua experiência e otimizar nossos serviços.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Como utilizamos suas informações</h2>
              <p>Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Melhorar a navegação e a experiência no site;</li>
                <li>Fornecer suporte e responder a solicitações;</li>
                <li>Enviar comunicações sobre nossos serviços, caso tenha consentido;</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Compartilhamento de Informações</h2>
              <p>Não vendemos ou compartilhamos suas informações pessoais com terceiros, exceto nos seguintes casos:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Para parceiros de tecnologia que nos auxiliam na operação do site e serviços;</li>
                <li>Para cumprir exigências legais ou proteger nossos direitos.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Segurança dos Dados</h2>
              <p>Adotamos medidas de segurança para proteger suas informações contra acessos não autorizados, perdas ou alterações. No entanto, nenhum sistema é 100% seguro, e recomendamos que você também proteja seus dados.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Seus Direitos</h2>
              <p>Você pode:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Solicitar acesso, correção ou exclusão de seus dados;</li>
                <li>Revogar seu consentimento para o uso de determinadas informações;</li>
                <li>Configurar seu navegador para gerenciar cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Alterações nesta Política</h2>
              <p>Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas em nosso site.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Contato</h2>
              <p>Se tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo nosso canal oficial de suporte.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
