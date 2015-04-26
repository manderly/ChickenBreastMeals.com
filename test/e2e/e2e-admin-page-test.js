'use strict';
var webdriver = require('selenium-webdriver');

describe('E2E: admin actions (e2e-admin-page-test.js)', function() {

  beforeEach(function() {
    browser.get('/#/admin');
    element(by.model('username')).sendKeys('cbmadmin');
    element(by.model('password')).sendKeys('p');

    element(by.id('btn-login')).click();

    expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/#/admin");
  });

it('can populate and save a basic new meal', function() {
    element(by.id('form-recipeName')).sendKeys('Test chicken');
    element(by.id('form-description')).sendKeys('Test description');
    element(by.id('form-ingredient0')).sendKeys('Test ingredient');
    element(by.id('form-prepTime')).sendKeys('5');
    element(by.id('form-cookTime')).sendKeys('15');
    element(by.id('form-yield')).sendKeys('20');
    element(by.id('form-step0')).sendKeys('Step one');
    element(by.id('form-step1')).sendKeys('Step two');
    element(by.id('form-creditName')).sendKeys('Big Recipe Site');
    element(by.id('form-creditURL')).sendKeys('http://recipes.com');

    //save button requires scrolling back to top
    var saveButton = element(by.id('save-button'));
    browser.executeScript('window.scrollTo(0,0);').then(function() {
        expect(saveButton.isEnabled()).toBe(true);
        saveButton.click();
    });

    var recipeList = element(by.css('.cms-recipeTitleList'));
    var recipe = recipeList.element(by.css('li'));
    expect(recipe.getText()).toContain('Test chicken');

  });

});
