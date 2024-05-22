it('fails', () => {
  cy.get('[data-cy="delete"]').should('be.visible').click();

  cy.get('[data-cy="error"]').should('contain', 'Failed to delete product');
});
it('fails can not add product', () => {
  cy.intercept('POST', 'https://localhost:7072/Product', {
    body: {error: ""},
  }).as('createProduct');

  cy.get('[data-cy="description"]').should('be.visible').type('A book description');

  cy.get('[data-cy="submit"]').should('be.visible').click();

  cy.wait('@createProduct', { timeout: 10000 }).its('response.statusCode').should('equal', 200);

  cy.get('[data-cy="error"]').should('contain', 'Failed to add product');
});