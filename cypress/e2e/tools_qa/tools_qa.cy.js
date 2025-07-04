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
        cy.get('#result').should('be.visible').then(($el)=> { // verifica o texto retornado após clicar no checkbox e printa no log//
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

    it('testando o card elements - Radio Button', () =>{
        cy.contains('.card-body', 'Elements').click();
        cy.get('#item-2').should('have.text', 'Radio Button').click();
        cy.url().should('include', '/radio-button');
        cy.get('.text-center').should ('have.text', 'Radio Button');
        cy.get('.mb-3').should('be.visible').then(($el)=>{ //retorna o texto do you like this site//
            cy.log($el.text());
        })
        cy.get('.custom-control-label') //Recupera o campo clicavel das opções (Yes, Impressive, No)//     
        .each(($el, index)=>{  
            const radioText = $el.text().trim();
            cy.log(`opção ${index+1}: ${radioText}`); //Mostra no log cada uma das opções//
            
            cy.wrap($el).click().then(() => { //Clica em cada uma das opções//
                cy.get('.mt-3').each(($el, index) =>{ //Texto de sucesso das opções//
                    const responseOption = $el.text();
                    cy.log(`${index + 1}: ${responseOption}`) //Retorna no console a opção selecionada e o texto de sucesso dela//
                });
            });
            
        });        
    });
    it('testando card elements - web tables', () =>{
       
        let name = faker.person.firstName();
        let lastName = faker.person.lastName();
        let email = faker.internet.email(name, lastName);
        let age = faker.number.int({ min: 18, max: 65 });
        let salary = faker.number.int({ min: 3000, max: 10000 });
        let department = faker.commerce.department();
        let sucess;
        
        //criação
        cy.contains('.card-body', 'Elements').click()
        cy.get('#item-3').should('have.text', 'Web Tables').click();
        cy.url().should('include', '/webtables');
        cy.get('.text-center').should('have.text', 'Web Tables').should('be.visible');
        cy.get('#addNewRecordButton').should('be.visible').click();
        cy.get('#firstName').click().type(name);
        cy.get('#lastName').click().type(lastName);
        cy.get('#userEmail').click().type(email);
        cy.get('#age').click().type(age);
        cy.get('#salary').click().type(salary);
        cy.get('#department').click().type(department);
        cy.get('#submit').click();
        cy.get('#searchBox').click().type(name);
        cy.get('.rt-td').first().should(`have.text`, name);
        cy.get('#edit-record-4').click();
        
        //edição
        cy.get('.modal-content').should('be.visible');
        cy.get('#firstName').click().clear().type(`${name}edit`);
        cy.get('#lastName').click().clear().type(`${lastName}edit`);
        cy.get('#userEmail').click().clear().type(`edit${email}`);
        cy.get('#age').click().type(age + 1);
        cy.get('#salary').clear().click().type(salary + 1000);
        cy.get('#department').clear().click().type(`${department}edit`);
        cy.get('#submit').click();
        cy.get('#delete-record-4').click();
        cy.get('.modal-content').should('not.exist').then(() => {
            cy.log('Modal closed successfully');
        });
        cy.get('#searchBox').clear();
        cy.get('.rt-table').should('not.contain', `${name}edit`);
    })

    it('testando card elements - buttons', () => {
        cy.contains('.card-body', 'Elements').click();
        cy.get('#item-4').should('have.text', 'Buttons').click();
        cy.url().should('include', '/buttons');
        cy.get('.text-center').should('have.text', 'Buttons');
        cy.get('#doubleClickBtn').should('be.visible').dblclick();
        cy.get('#doubleClickMessage').should('be.visible').then(($doubleClickMessage) => {
            const doubleClickText = $doubleClickMessage.text();
            cy.log( doubleClickText);
            expect(doubleClickText).to.include('You have done a double click');
        });
        cy.get('.btn:contains("Click Me")').last().should('be.visible').click();
        cy.get('#dynamicClickMessage').should('be.visible').then(($clickMessage) => {
            const clickText = $clickMessage.text();
            cy.log(clickText);
            expect(clickText).to.include('You have done a dynamic click');
        });
        cy.get('#rightClickBtn').should('be.visible').rightclick();
        cy.get('#rightClickMessage').should('be.visible').then(($rightClickMessage) => {
            const rightClickText = $rightClickMessage.text();
            cy.log(rightClickText);
            expect(rightClickText).to.include('You have done a right click');
        });
                
    });
    
    it('testando card elements - links', () => {
        //clica no link pra página inicial e volta pra pagina de links
        cy.contains('.card-body', 'Elements').click();
        cy.get('#item-5').should('have.text', 'Links').click();
        cy.url().should('include', '/links');
        cy.get('.text-center').should('have.text', 'Links');
        cy.get('#simpleLink')
            .should('have.attr', 'href', 'https://demoqa.com')
            .invoke('removeAttr', 'target')
            .click();
            cy.url().should('include', 'https://demoqa.com');
        cy.go('back');

        //clica no link pra página de links e volta pra pagina de links
        cy.url().should('include', '/links');
        cy.get('.text-center').should('have.text', 'Links');
        cy.get('#dynamicLink')
            .should('have.attr', 'href', 'https://demoqa.com')
            .invoke('removeAttr', 'target')
            .click();
            cy.url().should('include', 'https://demoqa.com');
        cy.go('back');

        //envia uma request 
        cy.get('#created').click();
        cy.request({
            method: 'GET',
            url: 'https://demoqa.com/created',
            expectedStatusCode: 201
        }).then((linkResponse) => {
            cy.get('#linkResponse').should('be.visible').then(($linkResponse) => {
                const responseText = $linkResponse.text();
                cy.log(responseText);
            })       
        });
        
        cy.get('#no-content').click();
        cy.request({
            method: 'GET',
            url: 'https://demoqa.com/no-content',
            expectedStatusCode: 204
        }).then((linkResponse) => {
            cy.get('#linkResponse').should('be.visible').then(($linkResponse) => {
                const responseText = $linkResponse.text();
                cy.log(responseText);
            })       
        });

        cy.get('#moved').click();
        cy.request({
            method: 'GET',
            url: 'https://demoqa.com/moved',
            expectedStatusCode: 301
        }).then((linkResponse) => {
            cy.get('#linkResponse').should('be.visible').then(($linkResponse) => {
                const responseText = $linkResponse.text();
                cy.log(responseText);
            })       
        });

        cy.get('#bad-request').click();
        cy.request({
            method: 'GET',
            url: 'https://demoqa.com/bad-request',
            expectedStatusCode: 400,
            failOnStatusCode: false 
        }).then((linkResponse) => {
            cy.get('#linkResponse').should('be.visible').then(($linkResponse) => {
                const responseText = $linkResponse.text();
                cy.log(responseText);
            })       
        });
        cy.get('#unauthorized').click();
        cy.request({
            method: 'GET',
            url: 'https://demoqa.com/unauthorized',
            expectedStatusCode: 401,
            failOnStatusCode: false 
        }).then((linkResponse) => {
            cy.get('#linkResponse').should('be.visible').then(($linkResponse) => {
                const responseText = $linkResponse.text();
                cy.log(responseText);
            })       
        });
        cy.get('#forbidden').click();
        cy.request({
            method: 'GET',
            url: 'https://demoqa.com/forbidden',
            expectedStatusCode: 403,
            failOnStatusCode: false 
        }).then((linkResponse) => {
            cy.get('#linkResponse').should('be.visible').then(($linkResponse) => {
                const responseText = $linkResponse.text();
                cy.log(responseText);
            })       
        });
        cy.get('#invalid-url').click();
        cy.request({
            method: 'GET',
            url: 'https://demoqa.com/not-found',
            expectedStatusCode: 404,
            failOnStatusCode: false
        }).then((linkResponse) => {
            cy.get('#linkResponse').should('be.visible').then(($linkResponse) => {
                const responseText = $linkResponse.text();
                cy.log(responseText);
            })       
        });
    });
    it.only('testando card elements - broken links', () => {
        cy.contains('.card-body', 'Elements').click();
        cy.get('#item-6').should('have.text', 'Broken Links - Images').click();
        cy.url().should('include', '/broken');
        cy.get('.text-center').should('have.text', 'Broken Links - Images');
        cy.contains('p', 'Valid image').first()
            cy.get('img[src="/images/Toolsqa.jpg"]').should('be.visible')
            .log('Imagem válida encontrada');
        cy.contains('p', 'Broken image').first()
            cy.get('img[src="/images/Toolsqa_1.jpg"]').should('be.visible')
            .log('imagem quebrada')
        
            
    });
});
