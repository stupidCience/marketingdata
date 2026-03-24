import { useState } from 'react';
import { Cable, CheckCircle2, Circle, Share2, RefreshCw } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';

// Simulação das contas que vêm da api/meta/ads/ad-accounts
const mockAdAccounts = [
  { id: "act_123456789", name: "E-commerce Alpha", status: "ACTIVE" },
  { id: "act_987654321", name: "Institucional Beta", status: "ACTIVE" },
  { id: "act_555444333", name: "Landing Page Teste", status: "ACTIVE" }
];

export default function Integrations() {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Integrações</h1>
        <p className="text-gray-500">Conecte suas fontes de dados e selecione as contas de anúncio.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Card da Meta */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white">
                <Share2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Meta Ads</h3>
                <span className="text-xs font-medium text-green-600 flex items-center">
                  <CheckCircle2 size={12} className="mr-1" /> Conectado
                </span>
              </div>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:underline flex items-center">
              <RefreshCw size={14} className="mr-1" /> Reautenticar
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">Selecione a conta para este Dashboard:</p>
            {mockAdAccounts.map((acc) => (
              <div 
                key={acc.id}
                onClick={() => setSelectedAccountId(acc.id)}
                className={`flex items-center justify-between cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedAccountId === acc.id 
                    ? 'border-blue-600 bg-blue-50 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {selectedAccountId === acc.id ? (
                    <CheckCircle2 className="text-blue-600" size={20} />
                  ) : (
                    <Circle className="text-gray-300" size={20} />
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-900">{acc.name}</p>
                    <p className="text-xs text-gray-500">{acc.id}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {acc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card de Integração Disponível (Exemplo Google) */}
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 flex flex-col items-center justify-center text-center opacity-60">
           <Cable size={40} className="text-gray-400 mb-4" />
           <h3 className="text-lg font-bold text-gray-900">Google Ads</h3>
           <p className="text-sm text-gray-500 mb-4 text-pretty px-4">Conecte sua conta do Google para consolidar seus dados de pesquisa.</p>
           <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-bold text-gray-600 cursor-not-allowed">
              Em breve
           </button>
        </div>
      </div>
    </AppLayout>
  );
}