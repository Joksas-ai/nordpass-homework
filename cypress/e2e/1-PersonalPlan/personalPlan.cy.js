/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('NordPass Personal plans test suite', () => {
  beforeEach(function() {
    cy.visit(`https://nordpass.com`);

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.fixture('planData.json').as('planData');
    cy.fixture('pageTitle.json').as('pageTitle');
    
    cy.contains('Reject all').click();
    cy.get('[data-testid="header-nav-personal"]').click();
    cy.contains('Check plans').click();
  });
  
  // afterEach(() => {
  //   cy.clearCookies();
  //   cy.clearLocalStorage();
  //   // cy.clearSessionStorage();
  // });

   it('Test Case1 - Personal Plan page is displayed with correct title', function() {
    cy.title().should('eq', this.pageTitle.personalTitle)
    cy.contains('Check plans').click();
  });

  it('Test Case2 - Get Started plan option is displayed', function() {
    cy.get('.nord-col > :nth-child(2) > .px-6 > :nth-child(1) > .flex-col > .text-small').should('eql', this.planData.tier.free);
    cy.get('.nord-col > :nth-child(1) > .px-6 > :nth-child(2) > .my-6 > .nord-button')
    .should('have.text', this.planData.getStartedText)
    .and('have.attr', 'href', this.planData.tryPremiumLink);
  });

  it('Test Case3 - Get Started plan button has <a> tag and the link is correct', function() {
    cy.get('.nord-col > :nth-child(1) > .px-6 > :nth-child(2) > .my-6 > .nord-button')
    .should('have.attr', 'href') 
    .and('equal', this.planData.tryPremiumLink) 
  });

  it('Test Case4 - Premium plan option is displayed', function() {
    cy.get('.nord-col > :nth-child(2) > .px-6 > :nth-child(1) > .flex-col > .text-small').should('eql', this.planData.tier.premium);
    cy.get('.nord-col > :nth-child(2) > .px-6 > :nth-child(2) > .my-6 > .nord-button').should('have text', this.planData.getPremiumPlanText);
  });

  it('Test Case5 - Premium plan button has <a> tag and the link is correct', function() {
    cy.get(':nth-child(2) > .py-6 > :nth-child(2) > .my-6 > .nord-button')
    .should('have.attr', 'href') 
    .and('contain', this.planData.purchasePremiumPlankLink) 
  });

  it('Test Case6 - Family plan option is displayed', function() {
    cy.get('.nord-col > :nth-child(2) > .px-6 > :nth-child(1) > .flex-col > .text-small').should('eql', this.planData.tier.family);
    cy.get('.nord-col > :nth-child(3) > .px-6 > :nth-child(2) > .my-6 > .nord-button').should('have text', this.planData.getFamilyPlanText);
  });

  it('Test Case7 - Family plan button has <a> tag and the link is correct', () => {
    cy.get('.nord-col > :nth-child(3) > .px-6 > :nth-child(2) > .my-6 > .nord-button')
    .should('have.attr', 'href') 
    .and('contain', this.planData.purchaseFamilyPlanLink) 
  });

});
