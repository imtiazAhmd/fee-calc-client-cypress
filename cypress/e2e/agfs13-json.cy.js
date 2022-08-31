context('AGFS Fee Scheme 13', () => {
  beforeEach(() => {
    cy.visit('https://laa-fee-calculator-app.herokuapp.com/')
  })
  const fixtureData = require('../fixtures/agfs.json')
  fixtureData.forEach((data) => {
    it('displays the correct fee', () => {
      cy.get('.form-group > #fee_scheme').select(data.fee_scheme)
      cy.wait(1500)
      cy.get('#scenario').select(data.scenario)
      cy.get('#offence_class').select(data.offence_class)
      cy.wait(1500)
      cy.get('#fee_type_code').select(data.fee_type_code)
      cy.get('#day').type(data.number_of_day)
      cy.get('#number_of_cases').type(data.number_of_cases)
      cy.get('#number_of_defendants').type(data.number_of_defendants)
      cy.get('#calculate_form').submit()

      cy.get('#result').should('have.text', data.expected_value)
    })
  })
})
