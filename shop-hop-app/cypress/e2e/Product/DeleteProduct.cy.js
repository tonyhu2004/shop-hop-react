/* eslint-disable */
describe('Delete product', () => {
  beforeEach(() => {
    cy.visit('/Account/Login');

    cy.fixture('login.json').then(loginResponse => {
      cy.intercept('POST', 'https://localhost:7072/User/login', {
        statusCode: 200,
        body: loginResponse,
      }).as('login');
    });

    cy.fixture('createdProducts.json').then(products => {
      cy.intercept('GET', 'https://localhost:7072/Product', {
        statusCode: 200,
        body: products,
      }).as('getProducts');
    });

    cy.get('[data-cy="email"]').should('be.visible').type('admin@gmail.com');
    cy.get('[data-cy="password"]').should('be.visible').type('Password123!');
    cy.get('[data-cy="submit"]').should('be.visible').click();

    cy.wait('@login').its('response.statusCode').should('equal', 200);

    cy.get('[data-cy="logout"]').should('be.visible');

    cy.visit('/ProductDashboard');

    cy.wait('@getProducts').its('response.statusCode').should('equal', 200);

    cy.get('[data-cy="name"]').contains('Book').parent()
        .find('[data-cy="openDelete"]').should('be.visible').click();

    cy.get('[data-cy="delete"]').should('be.visible').click();
  });

  it('passes', () => {
    cy.intercept('DELETE', 'https://localhost:7072/Product/4', {
      statusCode: 200,
      body: { success: true },
    }).as('deleteProduct');

    cy.fixture('products.json').then(createdProducts => {
      cy.intercept('GET', 'https://localhost:7072/Product', {
        statusCode: 200,
        body: createdProducts,
      }).as('getDeletedProducts');
    });

    cy.wait('@deleteProduct', { timeout: 10000 }).its('response.statusCode').should('equal', 200);

    cy.wait('@getDeletedProducts', { timeout: 10000 }).its('response.statusCode').should('equal', 200);

    cy.get('[data-cy="name"]').contains('Book').should('not.exist');
  });
});
