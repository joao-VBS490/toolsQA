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


describe('fazendo login na pagina de livros do ToolsQA', () => {
    beforeEach(() => {
        cy.viewport(1366, 780);
        cy.visit('https://demoqa.com/'); // Acessa a URL
        cy.get('#app header a img[src="/images/Toolsqa.jpg"]').should('be.visible');
        cy.fixture('fakeUser.json').as('fakeUser');
        
        
    })
    it('faz login', function (){

        cy.get('@fakeUser').then((user) => {
            cy.get('.card-body')
                .contains('Book Store Application')
                .click();
            cy.url().should('include', '/books');
            cy.get('.header-text')
                .should('contain', 'Book Store Application');
            cy.get('#item-0')
                .get(':nth-child(6) > .element-list > .menu-list > #item-0')
                .click();
            cy.get('.text-center')
                .should('be.visible')
                .and('have.text', 'Login');
            cy.get('#userName').type(this.fakeUser.username);
            cy.get('#password').type(this.fakeUser.password);
            cy.get('#login').click();
            
        });
    });
})