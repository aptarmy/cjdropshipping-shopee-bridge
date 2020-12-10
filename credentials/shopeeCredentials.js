module.exports = {
	shopId: parseInt(process.env.SHOPEE_SHOP_ID),
	partnerId: parseInt(process.env.SHOPEE_PARTNER_ID),
	partnerKey: process.env.SHOPEE_PARTNER_KEY,
	testCallbackURL: process.env.SHOPEE_TEST_CALLBACK_URL || "http://example.com",
	productionCallbackURL: process.env.SHOPEE_PROD_CALLBACK_URL || "http://example.com"
}