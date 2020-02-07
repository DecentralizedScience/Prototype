describe("Search input", () => {
  beforeEach( ()=>{
    cy.visit("/")
  })

  it("Autofocus on page load", () => {
    cy.get('[aria-label="reviewers search"]').focus()
  })
})
