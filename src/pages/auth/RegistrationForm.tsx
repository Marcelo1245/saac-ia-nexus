
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, 
  CheckCircle, 
  Upload, 
  Mail, 
  Building, 
  User, 
  Phone,
  FileText,
  Info,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';
import ConfettiEffect from '@/components/client/ConfettiEffect';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    position: '',
    corporateEmail: '',
    phone: '',
    acceptTerms: false,
    acceptPrivacy: false,
    documentUploaded: false
  });

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    // Final submission
    toast.success("Cadastro enviado com sucesso! Sua solicitação será analisada em até 24h.");
    setShowConfetti(true);
    
    // Redirect to client area after 3 seconds
    setTimeout(() => {
      navigate('/client-area');
    }, 3000);
  };

  const getProgressValue = () => {
    return (step / 3) * 100;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Dados Pessoais e Empresariais</h3>
            
            <div>
              <Label htmlFor="fullName" className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                Nome Completo
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                placeholder="Seu nome completo"
                className="bg-gray-700"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="companyName" className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-gray-400" />
                Empresa
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                placeholder="Nome da sua empresa"
                className="bg-gray-700"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="position" className="flex items-center">
                <Info className="h-4 w-4 mr-2 text-gray-400" />
                Cargo
              </Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => updateFormData('position', e.target.value)}
                placeholder="Seu cargo na empresa"
                className="bg-gray-700"
                required
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Verificação e Contato</h3>
            
            <div>
              <Label htmlFor="corporateEmail" className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                Email Corporativo
                <div className="relative group ml-2">
                  <HelpCircle className="h-3 w-3 text-gray-400" />
                  <div className="absolute left-full ml-2 top-0 w-52 p-2 bg-gray-800 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Utilizamos seu email corporativo para verificar seu vínculo com a empresa.
                  </div>
                </div>
              </Label>
              <Input
                id="corporateEmail"
                type="email"
                value={formData.corporateEmail}
                onChange={(e) => updateFormData('corporateEmail', e.target.value)}
                placeholder="seu@empresa.com.br"
                className="bg-gray-700"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                Telefone de Contato
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(00) 00000-0000"
                className="bg-gray-700"
                required
              />
            </div>
            
            <div className="p-4 bg-gray-700/50 rounded-md">
              <Label className="flex items-center mb-2">
                <Upload className="h-4 w-4 mr-2 text-gray-400" />
                Documento Comprobatório
              </Label>
              
              <div className="border-dashed border-2 border-gray-600 rounded-md p-6 text-center">
                <input
                  type="file"
                  className="hidden"
                  id="documentUpload"
                  onChange={() => updateFormData('documentUploaded', true)}
                />
                <label 
                  htmlFor="documentUpload" 
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-300">
                    Clique para fazer upload de um comprovante de vínculo empresarial
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    (crachá, contrato, declaração)
                  </span>
                </label>
              </div>
              
              {formData.documentUploaded && (
                <div className="mt-2 flex items-center text-green-400">
                  <CheckCircle size={16} className="mr-2" />
                  <span className="text-sm">Documento enviado com sucesso!</span>
                </div>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Termos e Confirmação</h3>
            
            <div className="p-4 bg-gray-700/50 rounded-md">
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-white">Termos de Uso</span>
              </div>
              
              <div className="h-32 overflow-y-auto bg-gray-800 p-3 rounded-md mb-2 text-sm text-gray-300">
                <p>Ao utilizar os serviços da SAAC.IA, você concorda com os seguintes termos:</p>
                <p className="mt-2">1. Todas as informações fornecidas são verdadeiras e podem ser verificadas.</p>
                <p className="mt-1">2. Os dados de prospecção serão utilizados apenas para fins comerciais legítimos.</p>
                <p className="mt-1">3. A SAAC.IA não se responsabiliza pelo uso indevido das informações obtidas através da plataforma.</p>
                <p className="mt-1">4. Você concorda em não compartilhar seu acesso com terceiros.</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => updateFormData('acceptTerms', checked === true)}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  Li e aceito os Termos de Uso
                </Label>
              </div>
            </div>
            
            <div className="p-4 bg-gray-700/50 rounded-md">
              <div className="flex items-center mb-2">
                <Shield className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-white">Política de Privacidade</span>
              </div>
              
              <div className="h-32 overflow-y-auto bg-gray-800 p-3 rounded-md mb-2 text-sm text-gray-300">
                <p>A SAAC.IA está comprometida com a proteção de seus dados:</p>
                <p className="mt-2">1. Coletamos apenas as informações necessárias para o funcionamento do serviço.</p>
                <p className="mt-1">2. Seus dados são armazenados com criptografia e seguindo as melhores práticas de segurança.</p>
                <p className="mt-1">3. Não compartilhamos seus dados com terceiros sem seu consentimento expresso.</p>
                <p className="mt-1">4. Você pode solicitar a exclusão de seus dados a qualquer momento.</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) => updateFormData('acceptPrivacy', checked === true)}
                />
                <Label htmlFor="acceptPrivacy" className="text-sm">
                  Li e aceito a Política de Privacidade
                </Label>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <ConfettiEffect active={showConfetti} />
      
      <div className="flex items-center justify-center mb-6">
        <Shield className="text-saac-blue mr-2" size={24} />
        <h2 className="text-xl font-semibold text-white">Cadastro de Acesso</h2>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Etapa {step} de 3</span>
          <span>{getProgressValue()}% Completo</span>
        </div>
        <Progress value={getProgressValue()} className="h-2" />
      </div>
      
      <form onSubmit={handleSubmit}>
        {renderStepContent()}
        
        <div className="mt-6 flex justify-end">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              className="mr-2"
              onClick={() => setStep(step - 1)}
            >
              Voltar
            </Button>
          )}
          
          <Button 
            type="submit" 
            className="bg-saac-blue hover:bg-blue-700"
            disabled={step === 3 && (!formData.acceptTerms || !formData.acceptPrivacy)}
          >
            {step < 3 ? 'Continuar' : 'Finalizar Cadastro'}
          </Button>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-center text-xs text-gray-400">
          <div className="flex items-center mx-2">
            <Shield className="h-3 w-3 mr-1 text-green-400" />
            <span>SSL Seguro</span>
          </div>
          <div className="flex items-center mx-2">
            <CheckCircle className="h-3 w-3 mr-1 text-green-400" />
            <span>GDPR</span>
          </div>
          <div className="flex items-center mx-2">
            <CheckCircle className="h-3 w-3 mr-1 text-green-400" />
            <span>LGPD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
