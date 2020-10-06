describe('addressbook-registration', () => {
    //ui tests only on registration route
    it('visits registration form', () => {
        cy.visit('/registration');
        cy.get('.mat-card-title').contains('Create a new member');
    })

    it('check validation message on invalid firstname input', () => {
        cy.get('.mat-card-content');

        cy.get('#mat-input-0').focus().blur();
        cy.get('#mat-error-22').contains('Firstname is required');

        cy.get('#mat-input-0').type('x').blur();
        cy.get('#mat-error-23').contains('Firstname must be at least 2 characters long');
    })

    it('can fill the form and submit', () => {
        cy.get('#mat-input-0').clear().type('Roger').should('have.value', 'Roger');

        cy.get('#mat-input-1').type("Glory").should("have.value", "Glory");

        cy.get('#mat-select-value-1').click();
        cy.get('#mat-option-1 > .mat-option-text').contains('Male').click();

        cy.get('.mat-datepicker-toggle-default-icon').click();
        cy.get(':nth-child(2) > [data-mat-col="0"]').click();
        cy.get('#mat-input-2').should('have.value', '01.12.2019');

        cy.get('#mat-input-3').type('Friedrichruher').should('have.value', 'Friedrichruher');

        cy.get('#mat-input-4').type('222').should('have.value', '222');

        cy.get('#mat-input-5').type('22041').should('have.value', '22041');

        cy.get('.mat-select-placeholder').click();
        cy.get('mat-option').contains('Hamburg Tonndorf').click();

        cy.get('form').submit();

        cy.url().should('include', ''); //navigate to homepage/users table list page after registration
    });
});
