context('LGFS Fee Scheme 10', () => {
  beforeEach(() => {
    cy.visit('https://laa-fee-calculator-app.herokuapp.com/')
  })

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

    // LGFS
    // Case type:  guilty plea
    // offence class: A
    // PPE : 70
    // Expected fee £ 782.45
    cy.get('.form-group > #fee_scheme').select('6')
    cy.wait('@getFeeScheme')

    cy.get('#scenario').select('2')
    cy.get('#offence_class').select('A')
    cy.wait('@getScenario')

    cy.get('#fee_type_code').select('LIT_FEE')
    cy.wait('@getLitigatorFee')

    cy.get('#day').type('1')
    cy.get('#number_of_defendants').type('1')
    cy.get('#ppe').type('70')
    cy.get('#calculate_form').submit()

    cy.get('#result').should('have.text', '£ 782.45')
  })
})
