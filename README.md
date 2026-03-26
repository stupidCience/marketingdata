# ⚙️ MarketingData API - Core Service

Esta é a API central do ecossistema **MarketingData**, responsável pela orquestração de autenticação, gestão de integrações via OAuth e execução do motor de **ETL (Extract, Transform, Load)** para métricas de marketing.

> **Nota:** Este é um repositório privado. O uso e distribuição de chaves de API contidas no ambiente local são restritos.

## 🏗️ Arquitetura do Sistema

A API foi construída seguindo o padrão de **Módulos**, facilitando a expansão para novos provedores (Google Ads, TikTok, etc.).

* **Core:** Middleware de autenticação (JWT), utilitários de resposta e configuração global do banco de dados.
* **Modules:** Cada provedor possui sua própria estrutura de `routes`, `controllers`, `services` e `repositories`.
* **Database:** Persistência em **SQLite** com foco em performance analítica para BI.

## 🚀 Stack Técnica

* **Runtime:** Node.js (ES Modules)
* **Framework:** Express.js
* **Banco de Dados:** SQLite3
* **Integrações:** Axios (Graph API Meta)
* **Segurança:** JWT (JSON Web Tokens) & Bcrypt

## 🔧 Configuração de Ambiente

Para rodar este serviço, é obrigatório criar um arquivo `.env` na raiz seguindo o modelo abaixo:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
META_CLIENT_ID=seu_client_id_da_meta
META_CLIENT_SECRET=seu_secret_da_meta
META_REDIRECT_URI=http://localhost:5173/integrations