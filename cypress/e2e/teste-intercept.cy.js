describe('Funcionalidade: Simulações - Administrar Reservas de livros', () => {

    beforeEach(() => {
        cy.loginApp(Cypress.env('USER_EMAIL'), Cypress.env('USER_SENHA'))
    })

    it('Deve exibir as reservas via intercept', () => {
        cy.fixture('reservas').then((dadosReserva) => {
            cy.intercept('GET', 'api/reservations', {
                statusCode: 200,
                body: dadosReserva
            }).as('listarReservas')

            cy.visit('dashboard.html')
            cy.wait('@listarReservas').its('response.statusCode').should('eq', 200)

            cy.url().should('include', 'dashboard')
            cy.get('h4').should('contain.text', 'Olá')
            cy.get('#user-name').should('contain', 'Usuário')


        })
    })



    it('Deve simular erro ao carregar reservas', () => {
        cy.intercept('GET', 'api/reservations', {
            statusCode: 500,
            body: {
                message: 'Erro ao carregar reservas'
            }
        }).as('erroReservas')

        cy.visit('dashboard.html')
        cy.wait('@erroReservas').its('response.statusCode').should('eq', 500)

        cy.url().should('include', 'dashboard')
        cy.get('h4').should('contain.text', 'Olá')
    })

})