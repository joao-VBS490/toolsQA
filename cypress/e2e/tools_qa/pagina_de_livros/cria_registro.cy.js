import {faker} from '@faker-js/faker';
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Script error.')) {
      // Retorna false para ignorar o erro e não falhar o teste
      return false;
    }
});


        
describe('automação de testes com toolsQA', ()=>{
    beforeEach (()=> {
        cy.viewport(1366, 780);
        cy.visit('https://demoqa.com/ '); // Acessa a URL
        cy.get('#app header a img[src="/images/Toolsqa.jpg"]').should('be.visible');
    });
    it('Testa o numero de cards e recupera o texto deles', () => { 
        // let name = faker.person.firstName();
        // let lastName = faker.person.lastName();
        // let nickname = faker.internet.username();
        // let password = "Cz1!qw2@#34"

        cy.task('generateFakeUser').then((userData) => {
            console.log(userData);
            cy.get('.card-body').should('have.length', 6);//verifica se exitem 6 cards na tela
        
            //recupera os cards e faz um loop para pegar o texto de cada um deles
            cy.get('.card-body').each(($el) => { 
                const cardtext = $el.text(); 
                cy.log(cardtext);
            });
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
            cy.get('#newUser')
                .click()
            cy.url()
                .should('include', '/register');
            cy.get('.text-center')
                .should('be.visible')
                .then(($text)=> {
                    const text = $text.text();
                    expect(text).to.include('Register');
                });
            cy.get('#firstname')
                .type(userData.firstName);
            cy.get('#lastname')
                .type(userData.lastName);
            cy.get('#userName')
                .type(userData.username);
            cy.get('#password')
                .type(userData.password)
            cy.get('#register')
                .click();
        });  

    });
});