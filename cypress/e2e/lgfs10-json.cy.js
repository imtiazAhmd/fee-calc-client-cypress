context('LGFS Fee Scheme 10', () => {
  beforeEach(() => {
    cy.visit('https://laa-fee-calculator-app.herokuapp.com/')
  })

  const fixtureData = require('../fixtures/lgfs.json')
  fixtureData.forEach((data) => {
    it('displays the correct fee', () => {
      cy.intercept('/calculator/fee_scheme_changed?fee_scheme=6').as(
        'getFeeScheme',
      )
      cy.intercept(
        '/calculator/select_list_changed?fee_scheme=6&scenario=2&offence_class=A&fee_type_code=EVID_PROV_FEE',
      ).as('getScenario')
      cy.intercept(
        '/calculator/select_list_changed?fee_scheme=6&scenario=2&offence_class=A&fee_type_code=LIT_FEE',
      ).as('getLitigatorFee')

      cy.get('.form-group > #fee_scheme').select(data.fee_scheme)
      cy.wait('@getFeeScheme')

      cy.get('#scenario').select(data.scenario)
      cy.get('#offence_class').select(data.offence_class)
      cy.wait('@getScenario')

      cy.get('#fee_type_code').select(data.fee_type_code)
      cy.wait('@getLitigatorFee')

      cy.get('#day').type(data.number_of_day)
      cy.get('#number_of_defendants').type(data.number_of_defendants)
      cy.get('#ppe').type(data.ppe)
      cy.get('#calculate_form').submit()

      cy.get('#result').should('have.text', data.expected_value)
    })
  })
})
