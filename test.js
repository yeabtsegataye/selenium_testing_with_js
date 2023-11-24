const { Builder, By, until } = require('selenium-webdriver');
const assert = require("assert");

describe('Title for testing using Mocha', () => {
  it('One testing block', async () => {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
      await driver.get('https://meskelwallet-omfg.onrender.com/');

      const login = await driver.findElement(By.css('.btn.btn-light.ml-2'));
      await login.click();

      const email = await driver.findElement(By.css('input.input[type="email"]'));
      await email.sendKeys('nahom@gmail.com');

      const password = await driver.findElement(By.css('input.input[type="password"]'));
      await password.sendKeys('123');
                                                      //element.class[type="typeKinde"]
      const submit = await driver.findElement(By.css('button.submit[type="submit"]'));
      await submit.click();

      const dashboardLink = await driver.wait(until.elementLocated(By.css('a.nav-link[href="/Dashboard"]')), 5000);
      const result = await dashboardLink.getAttribute('innerText');

      assert.strictEqual(result, "Dashboard", "Login was not successful");
    } finally {
      await driver.quit();
    }
  });
});


///////////
/* 
to download the webDriver go to the selenium-webdriver and chose your browser 
then downlod the compateble version and unzip it using     
then open terminal on the same folder and write this "sudo mv nameOfDriver /usr/local/bin"
then "export PATH=$PATH:/usr/local/bin" then you can check by writhing the nameOfDriver on the terminal
if it is successfull it will show some message . if not it will throw error 

*/