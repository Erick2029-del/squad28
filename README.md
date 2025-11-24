# EngPlay - Módulo de Cancelamento e Retenção

Este projeto consiste na implementação Front-end e integração Back-end (Firebase) do fluxo de cancelamento de assinatura da plataforma de cursos **EngPlay**. 

O objetivo do módulo não é apenas processar o cancelamento, mas atuar como uma ferramenta de retenção e coleta de feedback, identificando os motivos da saída do aluno e garantindo que ele esteja ciente das perdas envolvidas.

## Funcionalidades

* **Fluxo de Retenção em Etapas:** Design persuasivo dividido em páginas de impacto, avaliação e diagnóstico.
* **Coleta de Feedback:** Sistema de avaliação por estrelas e comentários.
* **Persistência de Dados (Firebase):** Integração com Firestore Database para salvar os motivos do cancelamento e feedback.
* **Gerenciamento de Estado Local:** Uso de `localStorage` para manter dados entre as páginas (ex: notas dadas na página anterior) e preferências do usuário.
* **Tema Dark/Light:** Sistema de troca de temas com persistência (o site "lembra" a escolha do usuário).
* **Sidebar Responsiva:** Barra lateral com status (aberta/fechada) salvo na memória do navegador.

## Tecnologias Utilizadas

* **HTML5** (Semântico)
* **CSS3** (Variáveis, Flexbox e Grid Layout)
* **JavaScript** (ES6+ Modules)
* **Firebase Firestore** (Banco de Dados NoSQL)

---

## Estrutura do Projeto

O projeto foi organizado para separar responsabilidades de estilização, lógica e estrutura:

```text
RESIDENCIA.../
├── 📂 assets/                # Imagens e ícones do projeto
├── 📂 CSS/
│   ├── 📂 estilo_cada_pagina/ # CSS específico para cada etapa do fluxo
│   ├── 📂 estilo_layout/      # Temas (light_mode.css)
│   ├── css_geral.css          # Resets e estilos globais
│   └── layout.css             # Estilos do Header e Sidebar
├── 📂 HTML/
│   ├── 📂 partials/           # (Legado) Fragmentos de Header/Sidebar para uso com fetch
│   ├── 📂 sub-paginas/        # Outras páginas da plataforma
│   ├── avaliacao_do_curso.html
│   ├── confirmacao.html
│   ├── diagnostico.html
│   └── impacto.html
├── 📂 scripts/
│   ├── app.js                 # (Opcional) Script para carregar HTML dinamicamente
│   ├── avaliacao_do_curso.js  # Lógica de estrelas e salvamento temporário
│   ├── diagnostico.js         # Integração final com Firebase
│   └── script.js              # Lógica global (Tema, Sidebar, Caminhos)
├── index.html                 # Página inicial do fluxo (Home/Decisão)
└── README.md
````

## Como Executar o Projeto

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

Como o projeto utiliza **ES6 Modules** (`import` / `type="module"`) para conectar ao Firebase, **você não pode apenas abrir o arquivo HTML com dois cliques**. É necessário rodar um servidor local simples.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_PROJETO.git](https://github.com/SEU_USUARIO/NOME_DO_PROJETO.git)
    ```
2.  **Abra no VS Code:**
    Abra a pasta do projeto no Visual Studio Code.
3.  **Use o Live Server:**
      * Instale a extensão **Live Server** no VS Code.
      * Clique com o botão direito no arquivo `index.html`.
      * Selecione **"Open with Live Server"**.
4.  **Navegação:**
    O projeto abrirá no seu navegador padrão. Siga o fluxo de cancelamento para testar a gravação no banco de dados.

-----

## Banco de Dados e Estrutura de Dados

O projeto utiliza o **Firebase Firestore**. Optamos por uma abordagem NoSQL para flexibilidade no armazenamento das respostas dos formulários.

### O que é salvo?

Quando o usuário confirma o cancelamento na página `diagnostico.html`, um documento JSON é enviado para a coleção `cancelamentos` contendo:

  * **Identificação:** Nome e E-mail (Mockados para este ambiente de teste).
  * **Feedback:** Notas (1-5) para Conteúdo, Didática e Usabilidade + Comentário opcional.
  * **Motivos:** Lista (Array) com os motivos selecionados (ex: `["Financeiro", "Falta de Tempo"]`).
  * **Metadados:** Data e Hora exata da solicitação.

### Exemplo de Registro no Banco:

```json
{
  "aluno": {
    "nome": "João da Silva",
    "email": "joao.aluno@email.com"
  },
  "feedback": {
    "estrelas": [
       {"categoria": "Conteúdo", "nota": 5},
       {"categoria": "Didática", "nota": 4},
       {"categoria": "Usabilidade", "nota": 5}
    ],
    "comentario": "Gostei do curso, mas estou sem tempo."
  },
  "motivosCancelamento": ["Falta de Tempo / Problemas Pessoais"],
  "metadata": {
    "canceladoEm": "2023-11-22T10:30:00.000Z",
    "displayData": "22/11/2023, 10:30:00"
  }
}
```

### Segurança e Senhas

Você notará que **não salvamos a senha do usuário** neste fluxo.

  * **Motivo:** Em um cenário real, o usuário já estaria logado na plataforma para acessar a página de cancelamento.
  * **Boas Práticas:** Nunca salvamos senhas em texto puro ou em formulários de feedback. A autenticação deve ser gerenciada por um serviço dedicado (como o Firebase Auth) e apenas o ID do usuário (UID) seria vinculado a este documento de cancelamento.

-----

## Decisões de Implementação

### 1\. Componentização (Fetch vs Static)

Dentro da pasta `scripts/`, existe um arquivo `app.js` e na pasta `HTML/partials/` existem arquivos para o Header e Sidebar.

  * **Abordagem Inicial:** A ideia original era carregar o Header e a Sidebar dinamicamente usando `fetch()` para evitar repetição de código.
  * **Abordagem Atual:** Para garantir compatibilidade total com hospedagens estáticas simples (como **GitHub Pages**) e evitar atrasos visuais (FOUC - Flash of Unstyled Content) ou problemas de rota (CORS/Caminhos Relativos), optamos por manter o HTML do menu estático em cada página na versão final de produção.
  * *Nota:* O código do `app.js` foi mantido no projeto para demonstrar conhecimento da técnica de injeção de componentes via JavaScript.

### 2\. Gerenciamento de Caminhos

Foi implementada uma lógica inteligente no `script.js` (`getPathPrefix`) que detecta se o usuário está na raiz ou em uma subpasta. Isso permite que o projeto funcione perfeitamente tanto localmente quanto no GitHub Pages, ajustando os caminhos dos assets (imagens e CSS) automaticamente.

-----

## Contribuição

Este é um projeto acadêmico/portfólio.

-----

**Desenvolvido para a disciplina de Residência em Software I.**

```
```