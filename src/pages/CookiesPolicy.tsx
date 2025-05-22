
import React from 'react';
import { ArrowLeft, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const CookiesPolicy = () => {
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
          <div className="flex items-center mb-8">
            <Cookie className="h-8 w-8 text-saac-blue mr-3" />
            <h1 className="text-3xl font-bold text-white">Política de Cookies</h1>
          </div>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">O que são cookies?</h2>
              <p>Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, smartphone ou outro) quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Por que usamos cookies?</h2>
              <p>Utilizamos cookies por diversos motivos, incluindo:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong className="text-white">Cookies essenciais:</strong> Necessários para o funcionamento do site e não podem ser desativados.</li>
                <li><strong className="text-white">Cookies de desempenho:</strong> Nos ajudam a entender como os visitantes interagem com nosso site, coletando informações anonimizadas.</li>
                <li><strong className="text-white">Cookies de funcionalidade:</strong> Permitem lembrar suas preferências e personalizar sua experiência.</li>
                <li><strong className="text-white">Cookies de marketing:</strong> Utilizados para rastrear visitantes e exibir anúncios relevantes com base nos seus interesses.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Como você pode controlar os cookies?</h2>
              <p>Você tem o direito de decidir se deseja aceitar ou rejeitar os cookies:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong className="text-white">Banners de consentimento:</strong> Ao acessar o site, você verá um banner solicitando seu consentimento para o uso de cookies não essenciais.</li>
                <li><strong className="text-white">Configurações do navegador:</strong> Você pode ajustar as configurações do seu navegador para recusar ou excluir cookies. Note que a desativação de alguns cookies pode impactar a funcionalidade do site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Alterações nesta Política</h2>
              <p>Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças em nossas práticas ou por razões legais. Recomendamos que você reveja esta página regularmente.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Contato</h2>
              <p>Se você tiver dúvidas sobre o uso de cookies em nosso site, entre em contato conosco:</p>
              <p className="mt-2">
                SAAC.IA – Sistema Automatizado de Alcance e Conversão<br />
                E-mail: <a href="mailto:contatocomercial@saacia.com" className="text-saac-blue hover:underline">contatocomercial@saacia.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;
