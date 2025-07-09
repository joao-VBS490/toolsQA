import { faker } from '@faker-js/faker';
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Script error.')) {
      // Retorna false para ignorar o erro e não falhar o teste
      return false;
    }
    
});
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Script error.')) {
    return false;
  }
});

describe('Adicionar livros', () => {
  beforeEach(() => {
    cy.viewport(1366, 780);
    cy.visit('https://demoqa.com/login'); // Acessa a URL
    cy.get('#app header a img[src="/images/Toolsqa.jpg"]').should('be.visible');
  });
  it('adicionando um livro', (() => {
    cy.fixture('fakeUser.json').then((userData) => {
      cy.get('#userName')
        .type(userData.username);
      cy.get('#password')
        .type(userData.password);
      cy.get('#login')
        .click();
      cy.get('#gotoStore').click();
      cy.url().should('include', '/books').then(() => {
        console.log('redirecinado para a pagina de livros com sucesso');
      });
      cy.get('.books-wrapper').then(($book) => {
        cy.contains('a', 'Git Pocket Guide').click();
        
      });
    });
  }));
});