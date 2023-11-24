const { Builder, By, until } = require('selenium-webdriver');
const assert = require("assert");
const env = require('dotenv').config()
const cp = require('./capabilities')

describe('Title for testing using Mocha', () => {
  let driver;

  const USERNAME = 'tatitaye0';
  const KEY = process.env.key;
  const GRID_HOST = 'hub.lambdatest.com/wd/hub';
  const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;  
  // we use beforeEach if we have multiple it block and if we 

  // want to do something before all excution
  beforeEach(async () => {

    // driver = await new Builder().forBrowser('firefox').build();
    driver = new Builder().usingServer(gridUrl).withCapabilities(cp.capability).build();
  })
  ///////
  // want to do something after all excution
  afterEach(() => {
    console.log('this will be excuted when every thing is done')
  })
  //////////

  it('login test', async () => {
    try {
      await driver.get('https://meskelwallet-omfg.onrender.com/');

      const login = await driver.findElement(By.css('.btn.btn-light.ml-2'));
      await login.click();

      const email = await driver.findElement(By.css('input.input[type="email"]'));
      await email.sendKeys(process.env.USRNAME);

      const password = await driver.findElement(By.css('input.input[type="password"]'));
      await password.sendKeys(process.env.PASSWORD);
      //element.class[type="typeKinde"]
      const submit = await driver.findElement(By.css('button.submit[type="submit"]'));
      await submit.click();

      const dashboardLink = await driver.wait(until.elementLocated(By.css('a.nav-link[href="/Dashboard"]')), 50000);
      const result = await dashboardLink.getAttribute('innerText');

      assert.strictEqual(result, "Dashboard", "Login was not successful");
    } finally {
      await driver.quit();
    }
  });
});
