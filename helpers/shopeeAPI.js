const axios = require("axios");
const HmacSha256 = require("crypto-js/hmac-sha256");

const shopeeCredentials = require("../credentials/shopeeCredentials");

const shopeeAPIURLs = {
	listItems: "https://partner.uat.shopeemobile.com/api/v1/items/get",
	updateItemStock: "https://partner.uat.shopeemobile.com/api/v1/items/update_stock",
	updateVariationStock: "https://partner.uat.shopeemobile.com/api/v1/items/update_variation_stock"
};

module.exports = {
	getAllProducts: async function() {
		const items = [];
		let pagination_offset = 0;
		let pagination_entries_per_page = 100;
		await getAllProducts();

		async function getAllProducts() {
			const httpBody = { pagination_offset, pagination_entries_per_page, "partner_id": shopeeCredentials.partnerId, "shopid": shopeeCredentials.shopId, "timestamp": Math.floor(new Date().getTime() / 1000) };
			response = await axios.post(shopeeAPIURLs.listItems, httpBody, { headers: {
				"Authorization": HmacSha256(`${shopeeAPIURLs.listItems}|${JSON.stringify(httpBody)}`, shopeeCredentials.partnerKey)
			} });
			items.push(...response.data.items);
			if(response.data.more) {
				pagination_offset += pagination_entries_per_page;
				await getAllProducts();
			}
		};
		return items;
	},

	updateProductStock: async function({ productId, stock }) {
		console.log(`updating stock productId: ${productId}...`);
		const httpBody = { item_id: productId, stock, "partner_id": shopeeCredentials.partnerId, "shopid": shopeeCredentials.shopId, "timestamp": Math.floor(new Date().getTime() / 1000) };
		const response = await axios.post(shopeeAPIURLs.updateItemStock, httpBody, { headers: {
			"Authorization": HmacSha256(`${shopeeAPIURLs.updateItemStock}|${JSON.stringify(httpBody)}`, shopeeCredentials.partnerKey)
		} });
		console.log(`✔ finish: ${JSON.stringify(response.data)}`);
	},

	updateVariationStock: async function({ productId, variationId, stock }) {
		console.log(`updating stock productId: ${productId}, variationId: ${variationId}...`);
		const httpBody = { item_id: productId, variation_id: variationId, stock, "partner_id": shopeeCredentials.partnerId, "shopid": shopeeCredentials.shopId, "timestamp": Math.floor(new Date().getTime() / 1000) };
		const response = await axios.post(shopeeAPIURLs.updateVariationStock, httpBody, { headers: {
			"Authorization": HmacSha256(`${shopeeAPIURLs.updateVariationStock}|${JSON.stringify(httpBody)}`, shopeeCredentials.partnerKey)
		} });
		console.log(`✔ finish: ${JSON.stringify(response.data)}`);
	},	
};