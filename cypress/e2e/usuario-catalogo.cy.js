describe('Funcionalidade: Catálogo de livros do usuário padrão', () => {

    beforeEach(() => {
        cy.loginApp(Cypress.env('USER_EMAIL'), Cypress.env('USER_SENHA'))
    })

    it('Deve acessar o catálogo pelo botão Explorar Catálogo', () => {
        cy.acessarCatalogo()
    })

    it('Deve exibir o botão Explorar Catálogo na home', () => {
        cy.visit('index.html')
        cy.contains('Explorar Catálogo').should('be.visible')
    })

    it('Deve acessar a cesta de livros pelo menu', () => {
        cy.acessarCesta()
        cy.contains('Cesta de Livros').should('be.visible')
    })

    it('Deve exibir livros no catálogo', () => {
        cy.visit('catalog.html')

        cy.url().should('include', 'catalog.html')
        cy.contains('1984').should('be.visible')
        cy.contains('George Orwell').should('be.visible')
    })

    it('Deve exibir botões de ação nos livros do catálogo', () => {
        cy.visit('catalog.html')

        cy.contains('Adicionar à Cesta').should('be.visible')
        cy.contains('Ver Detalhes').should('be.visible')
    })

    it('Deve simular carregamento de livros', () => {
        cy.acessarCatalogoComMock()

        cy.wait('@listarLivros').then((interception) => {
            const primeiroLivro = interception.response.body.books[0]

            cy.contains(primeiroLivro.title).should('be.visible')
        })


    })

    it('Deve exibir na tela os livros vindos do fixture', () => {
        cy.acessarCatalogoComMock()

        cy.wait('@listarLivros').then((interception) => {
            const primeiroLivro = interception.response.body.books[0]
            const segundoLivro = interception.response.body.books[1]

            cy.contains(primeiroLivro.title).should('be.visible')
            cy.contains(primeiroLivro.author).should('be.visible')
            cy.contains(segundoLivro.title).should('be.visible')
            cy.contains(segundoLivro.author).should('be.visible')
        })
    })

    it('deve adicionar livro à cesta e atualizar o contador', () => {
        cy.acessarCatalogoComMock()

        cy.get('#cart-count').invoke('text').then((textoAntes) => {
            const quantidadeAntes = Number(textoAntes)

            cy.contains('Adicionar à Cesta').first().click()

            cy.get('#global-alert-container')
                .should('be.visible')
                .and('contain', 'foi adicionado à cesta')

            cy.get('#cart-count').should(($contador) => {
                const quantidadeDepois = Number($contador.text())
                expect(quantidadeDepois).to.eq(quantidadeAntes + 1)
            })
        })
    })

    it('deve adicionar o primeiro livro à cesta ao clicar no botão Adicionar à Cesta', () => {
        cy.acessarCatalogoComMock()

        cy.get('#cart-count').invoke('text').then((textoAntes) => {
            const quantidadeAntes = Number(textoAntes)

            cy.contains('Adicionar à Cesta').first().click()

            cy.get('#global-alert-container')
                .should('be.visible')
                .and('contain', 'foi adicionado à cesta')

            cy.get('#cart-count').should(($contador) => {
                const quantidadeDepois = Number($contador.text())
                expect(quantidadeDepois).to.eq(quantidadeAntes + 1)
            })
        })
    })



    it('deve adicionar os 3 primeiros livros à cesta', () => {
        cy.acessarCatalogoComMock()

        cy.get('#cart-count').invoke('text').then((textoAntes) => {
            const quantidadeAntes = Number(textoAntes)

            cy.get('.add-to-cart').then(($botoes) => {
                cy.wrap($botoes[0]).click()
                cy.wrap($botoes[1]).click()
                cy.wrap($botoes[2]).click()
            })

            cy.get('#cart-count').should(($contador) => {
                const quantidadeDepois = Number($contador.text())
                expect(quantidadeDepois).to.eq(quantidadeAntes + 3)
            })
        })
    })

})