
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-saac-dark min-h-screen text-gray-200">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o site
              </Button>
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Termos de Uso</h1>
            <div className="h-1 w-20 bg-saac-blue mb-8"></div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Aceitação dos Termos</h2>
              <p className="text-gray-300">
                Ao acessar e utilizar o site SAAC.IA, você concorda com os seguintes Termos de Uso. Caso não concorde com algum termo, recomendamos que não utilize nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Uso do Serviço</h2>
              <p className="text-gray-300">
                O SAAC.IA oferece um sistema automatizado de alcance e conversão inteligente. O uso do serviço deve estar de acordo com todas as leis e regulamentos aplicáveis. O usuário não deve utilizar o serviço para atividades ilícitas, abusivas ou que possam comprometer a segurança do sistema e de terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Cadastro e Conta do Usuário</h2>
              <p className="text-gray-300">
                Para acessar determinados recursos, pode ser necessário criar uma conta. O usuário é responsável por fornecer informações precisas e manter a segurança de suas credenciais. O SAAC.IA não se responsabiliza por acessos não autorizados resultantes de negligência do usuário.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Propriedade Intelectual</h2>
              <p className="text-gray-300">
                Todos os conteúdos, marcas, logotipos e tecnologias utilizadas no site são de propriedade do SAAC.IA ou de seus licenciadores. É proibido copiar, distribuir, modificar ou utilizar qualquer conteúdo sem autorização prévia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Pagamentos e Assinaturas</h2>
              <p className="text-gray-300">
                Os planos de assinatura do SAAC.IA são cobrados conforme estabelecido no momento da contratação. O usuário pode cancelar sua assinatura a qualquer momento, mas não há reembolso para pagamentos já efetuados, salvo disposição em contrário.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SAAC.IA. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
