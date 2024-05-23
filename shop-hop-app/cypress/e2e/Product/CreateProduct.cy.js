/* eslint-disable */
describe('Create product', () => {
  beforeEach(() => {
    cy.visit('/Account/Login');

    cy.fixture('login.json').then(loginResponse => {
      cy.intercept('POST', 'https://localhost:7072/User/login', {
        statusCode: 200,
        body: loginResponse,
      }).as('login');
    });

    cy.fixture('products.json').then(products => {
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

    cy.visit('/ProductDashboard/Add');

    cy.get('[data-cy="name"]').should('be.visible').type('Book');
    cy.get('[data-cy="price"]').should('be.visible').type('100');

    cy.fixture('images/test-image.jpg').then(fileContent => {
      // Convert the file content to a Blob
      const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');

      // Create a File object from the Blob
      const file = new File([blob], 'test-image.jpg', { type: 'image/jpeg' });

      // Create a DataTransfer object and add the File to it
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      // Get the file input element and set its files property
      cy.get('[data-cy="image"]').then(input => {
        const el = input[0];
        el.files = dataTransfer.files;
        cy.wrap(input).trigger('change', { force: true });
      });
    });
  })

  it('passes', () => {
    cy.intercept('POST', 'https://localhost:7072/Product', {
      statusCode: 200,
      body: { success: true },
    }).as('createProduct');

    cy.fixture('createdProducts.json').then(createdProducts => {
      cy.intercept('GET', 'https://localhost:7072/Product', {
        statusCode: 200,
        body: createdProducts,
      }).as('getCreatedProducts');
    });

    cy.get('[data-cy="description"]').should('be.visible').type('A book description');
    cy.get('[data-cy="submit"]').should('be.visible').click();

    cy.wait('@createProduct', { timeout: 10000 }).its('response.statusCode').should('equal', 200);

    cy.wait('@getCreatedProducts', { timeout: 10000 }).its('response.statusCode').should('equal', 200);

    cy.get('[data-cy="name"]').contains('Book');
  });

  it('fails', () => {
    cy.get('[data-cy="submit"]').should('be.visible').click();

    cy.get('[data-cy="error"]').should('contain', 'Product is not complete');
  });
});
