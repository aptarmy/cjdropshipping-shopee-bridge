module.exports = {
	partnerId: process.env.SHOPEE_PARTNER_ID || "xxxxx",
	partnerKey: process.env.SHOPEE_PARTNER_KEY || "xxxxxxx",
	testCallbackURL: process.env.SHOPEE_TEST_CALLBACK_URL || "http://example.com",
	productionCallbackURL: process.env.SHOPEE_PROD_CALLBACK_URL || "http://example.com"
}