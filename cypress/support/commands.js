Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Vanessa')
    cy.get('#lastName').type('Luciano')
    cy.get('#email').type('vanessa@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})