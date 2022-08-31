context('AGFS Fee Scheme 13', () => {
  beforeEach(() => {
    cy.visit('https://laa-fee-calculator-app.herokuapp.com/')
  })

  it('displays the correct fee', () => {
    // AGFS
    // Case type:  guilty plea
    // offence band: 6.1
    // Advocate category: Junior
    // Expected fee: £4882
    cy.get('.form-group > #fee_scheme').select('7')
    cy.wait(1500)
    cy.get('#scenario').select('2')
    cy.get('#offence_class').select('6.1')
    cy.wait(1500)
    cy.get('#fee_type_code').select('AGFS_FEE')
    cy.get('#day').type('1')
    cy.get('#number_of_cases').type('1')
    cy.get('#number_of_defendants').type('1')
    cy.get('#calculate_form').submit()

    cy.get('#result').should('have.text', '£ 4882.0')
  })
})
