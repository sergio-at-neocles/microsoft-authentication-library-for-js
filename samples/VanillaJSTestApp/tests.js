const puppeteer = require('puppeteer');
const app = require("./app");
const PORT = 30662;

// Start the server.
app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:30662/');
  await page.screenshot({path: 'homepage.png'});

  page.on("popup", result => {
      result.once("framenavigated", async(frameResult) => {
          console.log(result.url());
          console.log("navigated");

          // enter username
          await result.screenshot({path: 'popup.png'});
          const emailIP = await result.$("input[type='email']");
          emailIP.type("<Please enter your email id>");
          await result.screenshot({path: 'username.png'});

          // submit the username
          const submitUserName = await result.$("input[type='submit']");
          submitUserName.click();
          /* TODO: add waitFor a certain doc element */
          await page.waitFor(2000);
          await result.screenshot({path: 'submitUserName.png'});

          // enter password
          const pwdIP = await result.$("input[type='password']");
          pwdIP.type("<Please enter your password>");
          await result.screenshot({path: 'password.png'});

          // submit the password
          const submitPwd = await result.$("input[type='submit']");
          submitPwd.click();
          /* TODO: add waitFor a certain doc element */
          await result.screenshot({path: 'submitPassword.png'});
      });

      result.on("close", async(popupClose) => {
          console.log("close invoked");
          await page.screenshot({path: 'signedin.png'});
          await page.waitFor(2000);
          await page.screenshot({path: 'accessToken.png'});
          await page.waitFor(6000);
          await browser.close();
          process.exit(0);
      });
    });

  const signIn = await page.$("#SignIn");
  signIn.click();
})();
