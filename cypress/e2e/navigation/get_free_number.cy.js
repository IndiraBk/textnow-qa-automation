

describe('Navigation Menu - Get Free Number Dropdown', () => {
  beforeEach(() => {
    cy.visit('/', {
      failOnStatusCode: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    cy.get('ul.links-nav > li', { timeout: 20000 }).first().should('exist').realHover();
  })

      it('Should display key features and buttons on the Free Phone Number page', () => {
        cy.contains('Free Phone Number').click();
        cy.url().should('include', '/free-phone-number');
        cy.contains('h1', 'Get a free phone number. Start calling & texting today.').should('be.visible');
        cy.contains('button', "Let's Do It").should('be.visible')
        cy.contains('What comes with your free phone number?').should('be.visible')
          .scrollIntoView()
          .should('be.visible')
        cy.contains('Unlimited talk & text').should('be.visible');
        cy.contains('All your contacts').should('be.visible');
        cy.contains('Caller ID & Voicemail').should('be.visible');
        cy.get('button')
          .filter(':visible') 
          .filter((index, el) => el.innerText.trim() === 'Download the App')
          .should('have.length', 3);  
      })

      it('Should search and display matching country', () => {
        const countries = ['Australia', 'Germany', 'Canada', 'Switzerland', 'Kazakhstan', 'Japan', 'United States', 'Georgia', 'France', 'Sweden', 'Singapore', 'South Korea']
        const randomCountry = countries[Math.floor(Math.random() * countries.length)]

        cy.contains('International Calling').click();
        cy.url().should('include', '/international-calling');
        cy.contains('h1', 'Affordable International calling. Wallet-friendly rates.').should('be.visible');
        cy.get('input[aria-label="Search for International Rates"]').type(randomCountry)
        cy.get('ul li').contains(randomCountry)
          .should('be.visible')
      })

      it('Should display message for invalid country search', () => {
        const fakeCountries = ['Wakanda', 'Narnia', 'Jupiter', 'Atlantis', 'Moon'];

        fakeCountries.forEach((fakeCountry) => {
        cy.contains('International Calling').click();
        cy.url().should('include', '/international-calling');
        cy.contains('h1', 'Affordable International calling. Wallet-friendly rates.').should('be.visible');
        cy.get('input[aria-label="Search for International Rates"]').clear().type(fakeCountry);
        cy.get('h2').should('include.text', `Results for “${fakeCountry}”`);
        cy.contains('div','No matching country could be found').should('be.visible')
      })
    })
  })
  