/* eslint-disable */
/// <reference types="cypress" />

describe('Страница входа', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });
  it('Авторизация пользователя и перенаправление на список счетов', () => {
    cy.get('.inputLogin').type('developer');
    cy.get('.inputPassword').type('skillbox');
    cy.get('.buttonAuth').click();
    cy.url().should('include', 'accounts');
  });
});

describe('страница счетов', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.get('.inputLogin').type('developer');
    cy.get('.inputPassword').type('skillbox');
    cy.get('.buttonAuth').click();
  });
  let numberOfAccounts;
  it('Проверка на добавление нового счёта', () => {
    cy.get('.accountDiv').then( res => {
      numberOfAccounts = res.length
      cy.wait(5000)
      cy.get('.createNewAccountBtn').click();
      cy.get('.accountDiv').should('have.length', numberOfAccounts + 1);
    });
  })
});
describe('подробная страница счёта', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.get('.inputLogin').type('developer');
    cy.get('.inputPassword').type('skillbox');
    cy.get('.buttonAuth').click();
    cy.get('.accountDiv:first-child .accountBtnMore').click();
  });
  it('Проверка формы перевода', () => {
    cy.get('.inputPayRecipient').type(1000);
    cy.get('.inputAmount').type(1000);
  })
});
