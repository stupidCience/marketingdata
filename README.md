# 📊 MarketingData - Dashboard UI

Este é o frontend do ecossistema **MarketingData**, uma interface administrativa construída em React para visualização de métricas de tráfego pago e gestão de integrações.

## 🎨 Interface e Recursos

* **Biblioteca de Dados:** Visualização tabular de métricas extraídas (Spend, Clicks, Impressions).
* **Gestão de Integrações:** Fluxo de autenticação OAuth com Meta Ads.
* **Seletor Dinâmico:** Modal para ativação/desativação de contas de anúncios.
* **Layout Responsivo:** Sidebar estruturada por seções (Análise, Gestão, Sistema).

## 🛠️ Stack Tecnológica

* **Framework:** React 18 (Vite)
* **Estilização:** Tailwind CSS
* **Ícones:** Lucide React
* **Comunicação:** Axios (com interceptors para Auth)
* **Navegação:** React Router Dom

## ⚙️ Configuração Local

1.  **Instalação:**
    ```bash
    npm install
    ```

2.  **Variáveis de Ambiente:**
    Crie um ficheiro `.env` na raiz do projeto:
    ```env
    VITE_API_URL=http://localhost:3000/api
    ```
    *(Nota: No Vite, variáveis de ambiente devem obrigatoriamente começar com `VITE_`)*.

3.  **Execução:**
    ```bash
    npm run dev
    ```

## 📂 Estrutura de Pastas

* `src/pages`: Componentes de página (DataLibrary, Integrations, AdsList).
* `src/components`: UI Elements reutilizáveis (Sidebar, Layout).
* `src/services`: Configuração do cliente Axios (`api.ts`).
* `src/hooks`: Lógica de estado compartilhada (se aplicável).

---
**Projeto Privado** - Uso Restrito.