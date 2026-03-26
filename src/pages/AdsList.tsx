// src/pages/AdsList.tsx
import { useState, useEffect } from 'react';
import { BarChart3, RefreshCw, AlertCircle } from 'lucide-react';
import api from '../services/api';

// Interface exata para o formato de dados que o Facebook nos devolve
interface AdAccount {
  account_id: string;
  name: string;
  account_status: number;
  currency: string;
  amount_spent: string;
}

export default function AdsList() {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAccounts = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Faz a requisição real para o nosso back-end
      const response = await api.get('/meta/ad-accounts');
      
      if (response.data.success) {
        setAccounts(response.data.data || []);
      } else {
        setError('Falha ao carregar contas de anúncios.');
      }
    } catch (err: any) {
      console.error("Erro ao buscar contas:", err);
      setError('Não foi possível conectar com a Meta. Verifique se a integração foi feita na página de Integrações.');
    } finally {
      setIsLoading(false);
    }
  };

  // Executa automaticamente assim que a página abre
  useEffect(() => {
    fetchAccounts();
  }, []);

  // O Facebook usa números para o status (1 = Ativa, 2 = Desativada, etc.)
  const getStatusBadge = (status: number) => {
    if (status === 1) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Ativa</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Inativa / Suspensa</span>;
  };

  // O campo amount_spent da Meta geralmente vem em cêntimos na moeda local (ex: 1050 = 10,50)
  const formatCurrency = (amount: string, currency: string) => {
    const value = (parseFloat(amount) || 0) / 100;
    return new Intl.NumberFormat('pt-PT', { 
      style: 'currency', 
      currency: currency || 'EUR' 
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contas de Anúncios</h1>
        <button 
          onClick={fetchAccounts}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <RefreshCw className={`mr-2 h-4 w-4 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {/* Alerta de Erro */}
      {error && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erro ao carregar dados</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabela de Contas */}
      {!error && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma conta selecionada</h3>
              <p className="mt-1 text-sm text-gray-500">
                Vá ao menu de Integrações, clique em "Configurar Contas" e escolha quais deseja monitorizar.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome da Conta</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID da Conta</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moeda</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Gasto</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts.map((account) => (
                    <tr key={account.account_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{account.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {account.account_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(account.account_status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {account.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatCurrency(account.amount_spent, account.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}