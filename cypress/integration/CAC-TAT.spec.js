/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum nibh vel orci aliquet rhoncus. Quisque rhoncus posuere volutpat. Donec tristique sapien ac est mollis, vel placerat velit tristique.'
        
        cy.get('#firstName').type('Vanessa')
        cy.get('#lastName').type('Luciano')
        cy.get('#email').type('vanessa@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
        cy.get('#firstName').type('Vanessa')
        cy.get('#lastName').type('Luciano')
        cy.get('#email').type('vanessa@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não númerico', function(){
        cy.get('#phone')
            .type('abcdefgh')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Vanessa')
        cy.get('#lastName').type('Luciano')
        cy.get('#email').type('vanessa@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Vanessa')
            .should('have.value', 'Vanessa')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Luciano')
            .should('have.value', 'Luciano')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('vanessa@teste.com')
            .should('have.value', 'vanessa@teste.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('12345779')
            .should('have.value', '12345779')
            .clear()
            .should('have.value', '')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })

    
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('selecione um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it.only('selecione um produto (blog) pelo seu indice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
  })
  