const sha256 = require('crypto-js/sha256');
const shopeeCredentials = require("../credentials/shopeeCredentials");

module.exports = {
  welcome: () => {
    console.log(`
   _____ __                             ______   __   ____       _     __         
  / ___// /_  ____  ____  ___  ___     / ____/  / /  / __ )_____(_____/ ____ ____ 
  \\__ \\/ __ \\/ __ \\/ __ \\/ _ \\/ _ \\   / /  __  / /  / __  / ___/ / __  / __ \`/ _ \\
 ___/ / / / / /_/ / /_/ /  __/  __/  / /__/ /_/ /  / /_/ / /  / / /_/ / /_/ /  __/
/____/_/ /_/\\____/ .___/\\___/\\___/   \\____\\____/  /_____/_/  /_/\\__,_/\\__, /\\___/ 
                /_/                                                  /____/       

github: https://github.com/aptarmy/cjdropshipping-shopee-bridge (v.0.0.1)
    `);
  },
  envNotSet: () => {
    console.log(`
⚠ Your environment variables are not set yet. Please follow the guid on Github: https://github.com/aptarmy/cjdropshipping-shopee-bridge
    Make sure that this environment variables are set correctly
    🟡 CJ_API_KEY (your CJ Dropshipping API Key)
    🟡 SHOPEE_SHOP_ID (your shopee shop ID) 
    🟡 SHOPEE_PARTNER_ID (your shopee partner ID. You will get this partner ID after the registration on https://open.shopee.com is successful)
    🟡 SHOPEE_PARTNER_KEY (your shopee partner key. You will get this partner key after the registration on https://open.shopee.com is successful)
========================
    `);
  },

  shopeeLoginURL: () => {
    console.log(`
🚀 In order for this tool to work, please make sure you have already logged and grant access through this link.
So this tool can sync stock from CJ Dropshipping to your Shopee Store

Test Shopee login URL (copy and paste in your browser):
https://partner.uat.shopeemobile.com/api/v1/shop/auth_partner?id=${encodeURIComponent(shopeeCredentials.partnerId)}&token=${encodeURIComponent(sha256(shopeeCredentials.partnerKey + shopeeCredentials.testCallbackURL))}&redirect=${encodeURIComponent(shopeeCredentials.testCallbackURL)}

Production Shopee login URL (copy and paste in your browser):
https://partner.shopeemobile.com/api/v1/shop/auth_partner?id=${encodeURIComponent(shopeeCredentials.partnerId)}&token=${encodeURIComponent(sha256(shopeeCredentials.partnerKey + shopeeCredentials.productionCallbackURL))}&redirect=${encodeURIComponent(shopeeCredentials.productionCallbackURL)}
========================
    `);
  },

  printEnv: () => {
    console.log(`
Environment variables this tool will use:
⚙ CJ_API_KEY: ${process.env.CJ_API_KEY}
⚙ SHOPEE_SHOP_ID: ${process.env.SHOPEE_SHOP_ID}
⚙ SHOPEE_PARTNER_ID: ${process.env.SHOPEE_PARTNER_ID}
⚙ SHOPEE_PARTNER_KEY: ${process.env.SHOPEE_PARTNER_KEY}
⚙ SHOPEE_TEST_CALLBACK_URL: ${process.env.SHOPEE_TEST_CALLBACK_URL}
⚙ SHOPEE_PROD_CALLBACK_URL: ${process.env.SHOPEE_PROD_CALLBACK_URL}
========================
    `);
  }
}