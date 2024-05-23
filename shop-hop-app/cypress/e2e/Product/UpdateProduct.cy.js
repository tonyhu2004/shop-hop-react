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

    cy.fixture('createdProducts.json').then(products => {
      cy.intercept('GET', 'https://localhost:7072/Product', {
        statusCode: 200,
        body: products,
      }).as('getProducts');
    });

    cy.fixture('product.json').then(product => {
      cy.intercept('GET', 'https://localhost:7072/Product/4', {
        statusCode: 200,
        body: product,
      }).as('getProductById');
    });

    cy.get('[data-cy="email"]').should('be.visible').type('admin@gmail.com');
    cy.get('[data-cy="password"]').should('be.visible').type('Password123!');
    cy.get('[data-cy="submit"]').should('be.visible').click();

    cy.wait('@login').its('response.statusCode').should('equal', 200);

    cy.get('[data-cy="logout"]').should('be.visible');

    cy.visit('/ProductDashboard');

    cy.wait('@getProducts').its('response.statusCode').should('equal', 200);

    cy.visit('/ProductDashboard/Edit/4');

    cy.wait('@getProductById').its('response.statusCode').should('equal', 200);

    cy.get('[data-cy="price"]').should('be.visible').click().type('{selectall}{backspace}200');

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
    cy.intercept('PUT', 'https://localhost:7072/Product/4', {
      statusCode: 200,
      body: { success: true },
    }).as('updateProduct');

    cy.fixture('updatedProducts.json').then(updatedProducts => {
      cy.intercept('GET', 'https://localhost:7072/Product', {
        statusCode: 200,
        body: updatedProducts,
      }).as('getUpdatedProducts');
    });
    cy.get('[data-cy="description"]').should('be.visible').click().type('{selectall}{backspace}An Amazing book description');

    cy.get('[data-cy="submit"]').should('be.visible').click();

    cy.wait('@updateProduct', { timeout: 10000 }).its('response.statusCode').should('equal', 200);

    cy.wait('@getUpdatedProducts', { timeout: 10000 }).its('response.statusCode').should('equal', 200);

    cy.get('[data-cy="name"]').contains('Book');
  });

  it('fails', () => {
    cy.get('[data-cy="description"]').should('be.visible').click().type('{selectall}{backspace}');

    cy.get('[data-cy="submit"]').should('be.visible').click();

    cy.get('[data-cy="error"]').should('contain', 'Product is not complete');
  });
});
