const assert = require("assert");
const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const options = new firefox.Options();
options.headless();
const driver = new Builder().forBrowser('firefox')
  .setFirefoxOptions(options).build();
//////////////////
const credentials = [
  { username: 'nahom@gmail.com', password: '12ju3' },
  { username: 'nahom@gmail.com', password: '123' },
  { username: 'user2@example.com', password: '15423' },
  // Add more username and password combinations as needed
];

describe('Title for testing using Mocha', () => {

  // Use afterEach to clean up resources after each test
  after(async () => {
    console.log('This will be executed after each test');
    await driver.quit();
  });

  // Iterate over the credentials array and run the test for each combination
  credentials.forEach((credential, index) => {
    it(`login test - Combination ${index + 1}`, async () => {
      try {
        await driver.get('https://meskelwallet-omfg.onrender.com/');

        const login = await driver.findElement(By.css('.btn.btn-light.ml-2'));
        await login.click();

        const email = await driver.findElement(By.css('input.input[type="email"]'));
        await email.sendKeys(credential.username);

        const password = await driver.findElement(By.css('input.input[type="password"]'));
        await password.sendKeys(credential.password);

        const submit = await driver.findElement(By.css('button.submit[type="submit"]'));
        await submit.click();

        const dashboardLink = await driver.wait(until.elementLocated(By.css('a.nav-link[href="/Dashboard"]')), 50000);
        const result = await dashboardLink.getAttribute('innerText');

        assert.strictEqual(result, "Dashboard", `Login was not successful for ${credential.username}`);
      } catch (error) {
        console.error(`Error in test for combination ${index + 1}:`, error);
        throw error;
      }
    });
  });
});

