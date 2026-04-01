/// <reference types="cypress" />
describe('Simulações de testes com intercept', () => {

    beforeEach(() => {
        cy.visit('login.html')
        cy.setCookie('jwt_education_shown', 'true')
    });

    it('Deve fazer login com sucesso com usuário comum - usando comando customizado', () => {
        cy.intercept('POST', 'api/login',
            {
                statusCode: 200,
                body: {
                    token: 'token123',
                    name: 'Usuario de teste'
                }
            }).as('loginMock')
        cy.login('usuario@007.com', 'user1234567890')
        cy.wait('@loginMock')
        cy.get('h4').should('contain', 'Olá')
    })

    it('Deve simular um erro do servidor', () => {
        cy.intercept('POST', 'api/login', {
            statusCode: 500
        }).as('erroServer')
        cy.login('usuario@teste.com', 'user123')
        cy.wait('@erroServer')
        cy.get('#alert-container').should('contain', 'Erro de conexão. Tente novamente.')
    });

    it('Deve simular um erro do cliente', () => {
        cy.intercept('POST', 'api/login', {
            statusCode: 400, body: { erro: 'erro do cliente'}
        }).as('erroClient')
        cy.login('usuario@teste.com', 'user123')
        cy.wait('@erroClient')
        cy.get('#alert-container').should('contain', 'Erro ao fazer login')
    });

    const recervas = {
    "reservations": [
        {
            "id": 4,
            "status": "active",
            "reservation_date": "2026-04-01 21:07:46",
            "pickup_deadline": "2026-04-03T21:07:46.711Z",
            "pickup_date": null,
            "return_deadline": null,
            "return_date": null,
            "notes": "",
            "renewal_count": 0,
            "title": "Livro de testes com intercept",
            "author": "Richard Marlon BAlestrim",
            "category": "Aventura",
            "cover_image": "menina-que-roubava-livros.jpg",
            "isbn": "978-85-AUTO-0008-4",
            "editor": "Editora Intrínseca",
            "language": "Português",
            "calculated_status": "active",
            "hours_remaining": 47
        },

                {
            "id": 4,
            "status": "active",
            "reservation_date": "2026-04-01 21:07:46",
            "pickup_deadline": "2026-04-03T21:07:46.711Z",
            "pickup_date": null,
            "return_deadline": null,
            "return_date": null,
            "notes": "",
            "renewal_count": 0,
            "title": "Livro 2.0",
            "author": "Juana Aparecida",
            "category": "Aventura",
            "cover_image": "menina-que-roubava-livros.jpg",
            "isbn": "978-85-AUTO-0008-4",
            "editor": "Editora Intrínseca",
            "language": "Português",
            "calculated_status": "active",
            "hours_remaining": 47
        },

        {
            "id": 5,
            "status": "active",
            "reservation_date": "2026-04-01 21:07:46",
            "pickup_deadline": "2026-04-03T21:07:46.713Z",
            "pickup_date": null,
            "return_deadline": null,
            "return_date": null,
            "notes": "",
            "renewal_count": 0,
            "title": "Cem Anos de Solidão",
            "author": "Gabriel García Márquez",
            "category": "Realismo Mágico",
            "cover_image": "cem-anos-solidao.jpg",
            "isbn": "978-85-AUTO-0013-2",
            "editor": "Editora Record",
            "language": "Português",
            "calculated_status": "active",
            "hours_remaining": 47
        },
        {
            "id": 6,
            "status": "active",
            "reservation_date": "2026-04-01 21:07:46",
            "pickup_deadline": "2026-04-03T21:07:46.726Z",
            "pickup_date": null,
            "return_deadline": null,
            "return_date": null,
            "notes": "",
            "renewal_count": 0,
            "title": "A Metamorfose",
            "author": "Franz Kafka",
            "category": "Ficção",
            "cover_image": "metamorfose.jpg",
            "isbn": "978-85-AUTO-0015-0",
            "editor": "Companhia das Letras",
            "language": "Português",
            "calculated_status": "active",
            "hours_remaining": 47
        },
        {
            "id": 7,
            "status": "active",
            "reservation_date": "2026-04-01 21:07:46",
            "pickup_deadline": "2026-04-03T21:07:46.726Z",
            "pickup_date": null,
            "return_deadline": null,
            "return_date": null,
            "notes": "",
            "renewal_count": 0,
            "title": "A Revolução dos Bichos",
            "author": "George Orwell",
            "category": "Ficção",
            "cover_image": "revolucao-bichos.png",
            "isbn": "978-85-AUTO-0004-9",
            "editor": "Companhia das Letras",
            "language": "Português",
            "calculated_status": "active",
            "hours_remaining": 47
        },
        
        {
            "id": 3,
            "status": "active",
            "reservation_date": "2026-04-01 21:07:08",
            "pickup_deadline": "2026-04-03T21:07:08.785Z",
            "pickup_date": null,
            "return_deadline": null,
            "return_date": null,
            "notes": "",
            "renewal_count": 0,
            "title": "A Arte da Guerra",
            "author": "Sun Tzu",
            "category": "Estratégia",
            "cover_image": "arte-da-guerra.jpg",
            "isbn": "978-85-AUTO-0006-8",
            "editor": "Editora Nova Fronteira",
            "language": "Português",
            "calculated_status": "active",
            "hours_remaining": 47
        }
    ],
    "statistics": {
        "active": 6,
        "pickedUp": 0,
        "returned": 0,
        "cancelled": 0,
        "overdue": 0,
        "expired": 0
    },
    "pagination": {
        "total": 6,
        "limit": 20,
        "offset": 0,
        "hasNext": false,
        "hasPrev": false,
        "showing": 6
    },
    "filters": {
        "status": "all",
        "orderBy": "desc"
    }
}

it.only('Deve exibir as reservas via intercept', () => {
    cy.login('usuario@teste.com', 'user123')
    cy.get('h4').should('contain', 'Olá')
    cy.intercept('GET', 'api/reservations', {
        statusCode: 200,
        body: recervas
    }).as('listarRecervas')

    cy.visit('dashboard.html')
    cy.wait('@listarRecervas')

});

    it('Deve fazer login com sucesso com usuário admin - usando comando customizado', () => {
        cy.login(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_SENHA'))
        cy.get('h1').should('contain', 'Painel Administrativo')
    })

    it('Deve fazer login com sucesso com usuário comum - usando intercept', () => {
        cy.intercept('POST', 'api/login',
            {
                statusCode: 200,
                body: {
                    token: 'token123',
                    name: 'Usuário de teste'
                }
            }).as('loginMock')
        cy.login('usuario@usuario.com', 'testeuser123')
        cy.wait('@loginMock')
        cy.get('h4').should('contain', 'Olá')
    })

    it('Deve simular um erro do servidor - usando intercept', () => {
        cy.intercept('POST', 'api/login', {
            statusCode: 500
        }).as('erroServer')
        cy.loginErro('usuario@teste.com', 'user123')
        cy.wait('@erroServer')
        cy.get('#alert-container').should('contain', 'Erro de conexão. Tente novamente.')
    });

    it('Deve simular um erro do cliente - usando intercept', () => {
        cy.intercept('POST', 'api/login', {
            statusCode: 400, body: { erro: 'erro do cliente' }
        }).as('erroClient')
        cy.login('usuario@teste.com', 'user123', false)
        cy.wait('@erroClient')
        cy.get('#alert-container').should('contain', 'Erro ao fazer login')
    });
})