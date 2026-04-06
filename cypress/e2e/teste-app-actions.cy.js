describe('Funcionalidade: AppActions - Administrar Reservas de livros', () => {

    it('Deve acessar o dashboard usando AppAction', () => {
        cy.loginApp(Cypress.env('USER_EMAIL'), Cypress.env('USER_SENHA'))
        cy.visit('dashboard.html')
        cy.window().then((win) => {
            expect(win.localStorage.getItem('authToken')).to.exist
        })
        cy.url().should('include', 'dashboard')
        cy.get('h4').should('contain.text', 'Olá')
        cy.get('#user-name').should('contain', 'Usuário')
    })

    it('Deve acessar ações rápidas usando AppAction', () => {
        cy.loginApp(Cypress.env('USER_EMAIL'), Cypress.env('USER_SENHA'))
        cy.visit('dashboard.html')

        cy.url().should('include', 'dashboard')
        cy.contains('Buscar Livros').should('be.visible')
        cy.contains('Cestas de Livros').should('be.visible')
        cy.contains('Atualizar Perfil').should('be.visible')
    })


})