describe('automação de testes com toolsQA', ()=>{
    beforeEach (()=> {
        cy.visit('https://demoqa.com/ '); // Acessa a URL
        cy.get('.banner-image').should('be.visible');
    });

    it('Testa o elemento de texto', () => {
        cy.get('#app header a img[src="/images/Toolsqa.jpg"]').should('be.visible'); 
        cy.get( '.card mt-4 top-cards').should('have.lenghth', 5);
    });
});



