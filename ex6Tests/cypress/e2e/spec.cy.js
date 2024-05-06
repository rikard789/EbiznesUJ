/// <reference types="cypress" />

context('Contact form', () => {
  beforeEach(() => {
    cy.visit('https://webdriveruniversity.com/Contact-Us/contactus.html')
  })

  it('test1', () => {
    cy.get('input[name="first_name"]').first()
    .type('Adam').should('have.value', 'Adam')
  })

  it('test2', () => {
    cy.get('input[name="last_name"]').first()
    .type('Borg').should('have.value', 'Borg')
  })

  it('test3', () => {
    cy.get('input[name="email"]').first()
    .type('merz@gmail.com').should('have.value', 'merz@gmail.com')
  })

  it('test4', () => {
    cy.get('textarea[name="message"]').first()
    .type('description').should('have.value', 'description')
  })

  it('test5', () => {
    cy.get('input[name="first_name"]').first().type('Adam')
    cy.get('input[name="last_name"]').first().type('Borg')
    cy.get('input[name="email"]').first().type('merz@gmail.com')
    cy.get('textarea[name="message"]').first().type('description')
    cy.get('input[class="contact_button"]').first().click()

    cy.get('input[name="first_name"]').first().should('have.value', '')
    cy.get('input[name="last_name"]').first().should('have.value', '')
    cy.get('input[name="email"]').first().should('have.value', '')
    cy.get('textarea[name="message"]').first().should('have.value', '')
  })
})

context('Phone store', () => {
  beforeEach(() => {
    cy.visit('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')
    
  })
  it('test6', () => {
    cy.get('select[id="dropdowm-menu-1"]').first().select('Python').should('have.value', 'python')
    cy.get('select[id="dropdowm-menu-1"]').first().select('SQL').should('have.value', 'sql')
  })


  it('test7', () => {
    cy.get('input[type="checkbox"][value="option-1"]').first().check().should('be.checked')
    cy.get('input[type="checkbox"][value="option-1"]').first().uncheck().should('not.be.checked')
    cy.get('input[type="checkbox"][value="option-2"]').first().should('not.be.checked')
  })
})

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions')
  })

  it('test8', () => {
    cy.get('.action-email')
      .type('fake@email.com').should('have.value', 'fake@email.com')

      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      .type('slow.typing@email.com', { delay: 100 })
      .should('have.value', 'slow.typing@email.com')

    cy.get('.action-disabled')
      .type('disabled error checking', { force: true })
      .should('have.value', 'disabled error checking')
  })

  it('test9', () => {
    cy.get('.action-focus').focus()
      .should('have.class', 'focus')
      .prev().should('have.attr', 'style', 'color: orange;')
  })

  it('test10', () => {
    cy.get('.action-blur').type('About to blur').blur()
      .should('have.class', 'error')
      .prev().should('have.attr', 'style', 'color: red;')
  })

  it('test11', () => {
    cy.get('.action-clear').type('Clear this text')
      .should('have.value', 'Clear this text')
      .clear()
      .should('have.value', '')
  })

  it('test12', () => {
    cy.get('.action-form')
      .find('[type="text"]').type('HALFOFF')

    cy.get('.action-form').submit()
      .next().should('contain', 'Your form has been submitted!')
  })

  it('test13', () => {
    cy.get('.action-btn').click()

    // clicking in the center of the element is the default
    cy.get('#action-canvas').click()

    cy.get('#action-canvas').click('topLeft')
    cy.get('#action-canvas').click('top')
    cy.get('#action-canvas').click('topRight')
    cy.get('#action-canvas').click('left')
    cy.get('#action-canvas').click('right')
    cy.get('#action-canvas').click('bottomLeft')
    cy.get('#action-canvas').click('bottom')
    cy.get('#action-canvas').click('bottomRight')
    cy.get('#action-canvas')
      .click(80, 75) // click 80px on x coord and 75px on y coord
      .click(170, 75)
      .click(80, 165)
      .click(100, 185)
      .click(125, 190)
      .click(150, 185)
      .click(170, 165)

    cy.get('.action-labels>.label').click({ multiple: true })

    cy.get('.action-opacity>.btn').click({ force: true })
  })

  it('test14', () => {
    cy.get('.action-div').dblclick().should('not.be.visible')
    cy.get('.action-input-hidden').should('be.visible')
  })

  it('test15', () => {
    cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')
  })

  it('test16', () => {
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
      .check().should('be.checked')

    cy.get('.action-radios [type="radio"]').not('[disabled]')
      .check().should('be.checked')

    cy.get('.action-radios [type="radio"]')
      .check('radio1').should('be.checked')

    cy.get('.action-multiple-checkboxes [type="checkbox"]')
      .check(['checkbox1', 'checkbox2']).should('be.checked')

    cy.get('.action-checkboxes [disabled]')
      .check({ force: true }).should('be.checked')

    cy.get('.action-radios [type="radio"]')
      .check('radio3', { force: true }).should('be.checked')
  })

  it('test17', () => {
    cy.get('.action-check [type="checkbox"]')
      .not('[disabled]')
      .uncheck().should('not.be.checked')

    cy.get('.action-check [type="checkbox"]')
      .check('checkbox1')
      .uncheck('checkbox1').should('not.be.checked')

    cy.get('.action-check [type="checkbox"]')
      .check(['checkbox1', 'checkbox3'])
      .uncheck(['checkbox1', 'checkbox3']).should('not.be.checked')

    cy.get('.action-check [disabled]')
      .uncheck({ force: true }).should('not.be.checked')
  })

  it('test18', () => {
    cy.get('.action-select')
      .should('have.value', '--Select a fruit--')

    cy.get('.action-select').select('apples')
    cy.get('.action-select').should('have.value', 'fr-apples')

    cy.get('.action-select-multiple')
      .select(['apples', 'oranges', 'bananas'])
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    cy.get('.action-select').select('fr-bananas')
      .should('have.value', 'fr-bananas')

    cy.get('.action-select-multiple')
      .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    cy.get('.action-select-multiple')
      .invoke('val').should('include', 'fr-oranges')
  })

  it('test19', () => {
    cy.get('#scroll-horizontal button')
      .should('not.be.visible')

    cy.get('#scroll-horizontal button').scrollIntoView()
      .should('be.visible')

    cy.get('#scroll-vertical button')
      .should('not.be.visible')

    cy.get('#scroll-vertical button').scrollIntoView()
      .should('be.visible')

    cy.get('#scroll-both button')
      .should('not.be.visible')

    cy.get('#scroll-both button').scrollIntoView()
      .should('be.visible')
  })

  it('test20', () => {
    cy.get('.trigger-input-range')
      .invoke('val', 25)
      .trigger('change')
      .get('input[type=range]').siblings('p')
      .should('have.text', '25')
  })
})
