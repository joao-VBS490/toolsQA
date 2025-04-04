Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Script error.')) {
      // Retorna false para ignorar o erro e não falhar o teste
      return false;
    }
  });

describe('automação de testes com toolsQA', ()=>{
    beforeEach (()=> {
        cy.visit('https://demoqa.com/ '); // Acessa a URL
        cy.get('#app header a img[src="/images/Toolsqa.jpg"]').should('be.visible');
    });

    it('Testa o numero de cards e recupera o texto deles', () => { 
        cy.get('.card-body').should('have.length', 6);//verifica se exitem 6 cards na tela
        
        //recupera os cards e faz um loop para pegar o texto de cada um deles
        cy.get('.card-body').each(($el) => { 
            const cardtext = $el.text(); 
            cy.log(cardtext);
        });
        
    });

    it.only ('teste do card elements', () => {
        cy.contains('.card-body', 'Elements').click();
        cy.url().should('include', '/elements');
        cy.get('#item-0').should('have.text','Text Box').click();
        cy.get('.text-center').should('have.text','Text Box');
        cy.get('#userName').focus().type('Joao V');
        cy.get('#userEmail').focus().type('joaoteste@teste.com');
        cy.get('#currentAddress').focus().type('Rua cypress');
        cy.get('#permanentAddress').focus().type('Rua cypress');
    })
});



