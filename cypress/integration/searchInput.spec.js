describe("Search input", () => {

  beforeEach( ()=>{
    // visit main page
    cy.visit("/")
    // wait for an element on the reviewers table
    cy.get('.MuiTableCell-body')
  })

  it("Autofocus on page load", () => {
    cy.get('[aria-label="reviewers search"]').focus()
  })

  it("Allows click in the 'only unoccupied' filter", () => {
    cy.get('[aria-label="primary checkbox"]')
    .click()
    cy.get('[aria-label="primary checkbox"]')
    .check()
  })

  it("Filters 'Occupied users' when clicking the filter", () => {

    cy.get('[aria-label="primary checkbox"]')
    .click()
    // All badges should all have green color (unnocupied users)
    cy.get('.MuiBadge-badge').each((el) => {
      cy.wrap(el).should('have.css', 'background-color', 'rgb(76, 175, 80)')
    })
  })

})
