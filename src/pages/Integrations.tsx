// src/pages/Integrations.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Cable, CheckCircle2, Circle, RefreshCw, Settings, X } from 'lucide-react';
import api from '../services/api';

const META_APP_ID = import.meta.env.VITE_META_APP_ID; 
const META_REDIRECT_URI = window.location.origin + '/integrations'; 

// Interface para as contas de anúncio
interface AdAccount {
  account_id: string;
  name: string;
  currency: string;
}

export default function Integrations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  // Estados para o Modal de Contas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableAccounts, setAvailableAccounts] = useState<AdAccount[]>([]);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
  const [isSavingAccounts, setIsSavingAccounts] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await api.get('/meta/status');
        setIsConnected(response.data.data.isConnected);
      } catch (error) {
        console.error('Erro ao checar status da Meta:', error);
      } finally {
        setIsLoadingStatus(false);
      }
    };
    checkStatus();
  }, []);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleMetaCallback(code);
    }
  }, [searchParams]);

  const handleConnectMeta = () => {
    if (!META_APP_ID) {
      alert("Erro: VITE_META_APP_ID não configurado no .env do Front-end.");
      return;
    }
    setIsConnecting(true);
    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${META_REDIRECT_URI}&scope=ads_read,read_insights`;
    window.location.href = authUrl;
  };

  const handleMetaCallback = async (code: string) => {
    setIsConnecting(true);
    try {
      await api.post('/meta/auth/callback', { code, redirectUri: META_REDIRECT_URI });
      setIsConnected(true);
      setSearchParams({});
      alert('Meta Ads conectado com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar Meta:', error);
      alert('Falha ao conectar com o Meta Ads. O código pode ter expirado.');
      setSearchParams({});
    } finally {
      setIsConnecting(false);
    }
  };

  // --- LÓGICA DO MODAL ---

  // Abre o modal e vai buscar as contas à API
  const handleOpenSettings = async () => {
    setIsModalOpen(true);
    setIsLoadingAccounts(true);
    try {
      // Fazemos as duas requisições ao mesmo tempo para ser mais rápido (Promise.all)
      const [metaResponse, savedResponse] = await Promise.all([
        api.get('/meta/ad-accounts/available'), // 👈 Alterado para a rota correta!
        api.get('/meta/ad-accounts/saved')
  ]);

      if (metaResponse.data.success) {
        setAvailableAccounts(metaResponse.data.data || []);
      }

      if (savedResponse.data.success) {
        // Mapeia o nosso banco (external_account_id) para as checkboxes pré-marcadas
        const savedIds = savedResponse.data.data.map((acc: any) => acc.external_account_id);
        setSelectedAccountIds(savedIds);
      }
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
      alert('Erro ao carregar as contas de anúncio do Facebook.');
    } finally {
      setIsLoadingAccounts(false);
    }
  };

  // Lida com a marcação/desmarcação das checkboxes
  const toggleAccountSelection = (accountId: string) => {
    setSelectedAccountIds(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId) // Remove se já estiver selecionada
        : [...prev, accountId]                // Adiciona se não estiver
    );
  };

  // Envia as contas selecionadas para o nosso Back-end guardar no SQLite
  const handleSaveAccounts = async () => {
    setIsSavingAccounts(true);
    try {
      // Filtramos o array original para enviar os objetos completos das contas selecionadas
      const accountsToSave = availableAccounts.filter(acc => selectedAccountIds.includes(acc.account_id));
      
      await api.post('/meta/ad-accounts/select', { accounts: accountsToSave });
      
      alert('Contas guardadas com sucesso!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao guardar contas:', error);
      alert('Ocorreu um erro ao tentar guardar as contas.');
    } finally {
      setIsSavingAccounts(false);
    }
  };

  if (isLoadingStatus) {
    return (
      <div className="flex h-64 items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Cable className="mr-3" size={28} />
          Integrações
        </h1>
        <p className="mt-1 text-gray-500">Conecte as suas ferramentas de marketing para centralizar os dados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Card Meta Ads */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Meta Ads</h3>
                  <p className="text-sm text-gray-500">Facebook & Instagram</p>
                </div>
              </div>
              {isConnected ? (
                <CheckCircle2 className="text-green-500" size={24} />
              ) : (
                <Circle className="text-gray-300" size={24} />
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-6 h-10">
                {isConnected 
                  ? "Conta conectada. Configure as contas de anúncios que deseja monitorizar."
                  : "Conecte a sua conta para analisar métricas de custo, alcance e conversão."}
              </p>
              <div className="flex items-center justify-between mt-auto">
                 {isConnected ? (
                   <button 
                     onClick={handleOpenSettings}
                     className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                   >
                     <Settings className="mr-2 h-4 w-4" />
                     Configurar Contas
                   </button>
                 ) : (
                  <button 
                    onClick={handleConnectMeta}
                    disabled={isConnecting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? (
                      <>
                         <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                         A conectar...
                      </>
                    ) : (
                      "Conectar Conta"
                    )}
                  </button>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE SELEÇÃO DE CONTAS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          
          {/* Painel do Modal */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden max-h-[90vh] animate-in fade-in zoom-in duration-200">
            
            {/* Cabeçalho */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                Selecione as Contas de Anúncio
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-md transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Corpo (Lista de Contas) */}
            <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
              <p className="text-sm text-gray-500 mb-4">
                Escolha quais as contas de publicidade cujos dados deseja importar para o Dashboard.
              </p>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {isLoadingAccounts ? (
                  <div className="flex justify-center items-center p-8">
                    <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                  </div>
                ) : availableAccounts.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-500">
                    Nenhuma conta de anúncios encontrada neste perfil.
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                    {availableAccounts.map((account) => (
                      <li 
                        key={account.account_id} 
                        className="p-3 hover:bg-blue-50/50 flex items-center cursor-pointer transition-colors" 
                        onClick={() => toggleAccountSelection(account.account_id)}
                      >
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                            checked={selectedAccountIds.includes(account.account_id)}
                            readOnly
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <label className="text-sm font-medium text-gray-900 cursor-pointer">
                            {account.name}
                          </label>
                          <p className="text-xs text-gray-500">ID: {account.account_id} • Moeda: {account.currency}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Rodapé (Botões) */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isSavingAccounts || isLoadingAccounts}
                onClick={handleSaveAccounts}
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSavingAccounts ? (
                  <>
                    <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    A guardar...
                  </>
                ) : (
                  'Guardar Seleção'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}