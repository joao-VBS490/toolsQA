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

    it ('teste do card elements - textbox', () => {
        cy.contains('.card-body', 'Elements').click();
        cy.url().should('include', '/elements');
        cy.get('#item-0').should('have.text','Text Box').click();
        cy.get('.text-center').should('have.text','Text Box');
        cy.get('#userName').focus().type('Joao V');
        cy.get('#userEmail').focus().type('joaoteste@teste.com');
        cy.get('#currentAddress').focus().type('Rua cypress');
        cy.get('#permanentAddress').focus().type('Rua cypress');
        cy.get('#submit'). click();
        cy.get('#output').should('be.visible');
        cy.get('.mb-1').each(($el) => {
            const cadastro = $el.text();
            cy.log(cadastro);
        });
        cy.get('#app header a img[src="/images/Toolsqa.jpg"]').click();
    });

    it('testando card elements - checkbox', ()=> {
        cy.contains('.card-body', 'Elements').click();
        cy.url().should('include', '/elements');
        cy.get('#item-1').should('have.text','Check Box').click();
        cy.get('.text-center').should('have.text','Check Box');
        cy.get('.rct-checkbox').click();
        cy.get('#result').should('be.visible').then(($el)=> { // verifica o texto retornado após clicar no checkbox e printa no log
            cy.log($el.text());
        });
        cy.get('.rct-checkbox').click();
        cy.get('button[aria-label="Toggle"]').click();
        cy.get('.rct-title').each(($el) => {
            const homechild = $el.text();
            cy.log(homechild);            
//captura o texto da opção desktop clica no checkbox e verifica o texto gerado//
            if (homechild.includes('Desktop')) {
                cy.wrap($el).should('be.visible').click();
                cy.get('#result');
                cy.get ('button[aria-label="Toggle"]').eq(1).click();
                cy.contains('.rct-title', 'Notes'). should('be.visible');
                cy.contains('.rct-title', 'Commands'). should('be.visible');
                cy.get ('button[aria-label="Toggle"]').eq(1).click();
            };
//captura o texto da opção Documents clica no checkbox e verifica o texto gerado//            
            if (homechild.includes('Documents')) {
                cy.wrap($el).should('be.visible').click();
                cy.get('#result');
                cy.get ('button[aria-label="Toggle"]').eq(2).click();
                cy.contains('.rct-title', 'WorkSpace'). should('be.visible');
                cy.contains('.rct-title', 'Office'). should('be.visible');
                cy.get ('button[aria-label="Toggle"]').eq(2).click();
            };
//captura o texto da opção Downloads clica no checkbox e verifica o texto gerado//
            if (homechild.includes('Downloads')) {
                cy.wrap($el).should('be.visible').click();
                cy.get('#result');
                cy.get ('button[aria-label="Toggle"]').eq(3).click();
                cy.contains('.rct-title', 'Word File.doc'). should('be.visible');
                cy.contains('.rct-title', 'Excel File.doc'). should('be.visible');
                cy.get ('button[aria-label="Toggle"]').eq(3).click();
            }
        
        });
    });

    it.only('testando o card elements - Radio Button', () =>{
        cy.contains('.card-body', 'Elements').click();
        cy.get('#item-2').should('have.text', 'Radio Button').click();
        cy.url().should('include', '/radio-button');
        cy.get('.text-center').should ('have.text', 'Radio Button');
        cy.get('.mb-3').should('be.visible').then(($el)=>{
            cy.log($el.text());
        })

        
        cy.get('.custom-control-label')        
        .each(($el, index)=>{
            const radioText = $el.text().trim();
            cy.log(`opção ${index+1}: ${radioText}`);
            
            cy.wrap($el).click().then(() => {
                cy.get('.mt-3').each(($el, index) =>{
                    const responseOption = $el.text();
                    cy.log(`${index + 1}: ${responseOption}`)
                });
            });
            
        });
        
    });
});
