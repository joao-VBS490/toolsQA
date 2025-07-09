# 📚 Projeto de Automação de Livraria – ToolsQA + Cypress

Este projeto tem como objetivo a automação de testes E2E utilizando **Cypress** em um sistema de livraria fictício, com base no site [ToolsQA Book Store](https://demoqa.com/books). O fluxo simula a criação de usuários, login e visualização de livros.

---

## 🔧 Tecnologias e Ferramentas

- [Cypress](https://www.cypress.io/) – Framework de automação de testes E2E
- [Faker](https://www.npmjs.com/package/faker) – Geração de dados fictícios
- Node.js – Lógica para manipulação de arquivos e tarefas customizadas
- `cy.task` – Execução de scripts Node no contexto do Cypress
- `cy.fixture` – Leitura de dados persistidos

---

## 📂 Estrutura do Projeto

```bash
📁 cypress
 ┣ 📁 e2e
 |┣ 📁 pagina_de_livros
 ┃ ┣ 📄 cria_registro.cy.js        # Teste de criação de usuário
 ┃ ┣ 📄 faz_login.cy.js           # Teste de login com o usuário criado
 ┃ ┣ 📄 add_livros.cy.js          # Teste de navegação e visualização de livros
 ┣ 📁 fixtures
 ┃ ┗ 📄 fakeUser.json             # Armazena os dados do usuário criado dinamicamente
📄 cypress.config.js              # Configuração do Cypress

✅ O que foi praticado
Criação de testes automatizados com Cypress
Geração e persistência de dados com Faker + Fixtures
Execução de tarefas customizadas com cy.task
Validação de elementos visuais e navegação
Organização de código em múltiplos fluxos

