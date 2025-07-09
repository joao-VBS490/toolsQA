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
    cy.visit('https://demoqa.com/books'); // Acessa a URL
    cy.get('#app header a img[src="/images/Toolsqa.jpg"]').should('be.visible');
  });

  it('adiciona um livro', ()=> {
    cy.fixture('fakeUser.json').then((userData) => {
      cy.get('.books-wrapper').then(()=> {
        console.log('sucesso, estamos na pagina de livros');
      });
      cy.get('#login')
        .click();
      cy.url().should('include', '/login');
      cy.get('.login-wrapper').then(() => {
        console.log('sucesso, redirecionado para a tela de login');
      });
      cy.get('#userName')
        .type(userData.username);
      cy.get('#password')
        .type(userData.password);
      cy.get('#login')
        .click();
      cy.get('#userName-value')
        .should('be.visible')
        .contains(userData.username);
    });
  });
});
