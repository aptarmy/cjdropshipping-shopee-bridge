const axios = require("axios");
const cjCredentials = require('../credentials/cjCredentials');

module.exports = {
	getConnetedProudcts: async function() {
		const httpBody = {"type": 0, "all": 1 };
		const response = await axios.post("https://developers.cjdropshipping.com/api/product/connectList", httpBody, {
			headers: {
				"CJ-Access-Token": cjCredentials.apiKey
			}
		});
		if(!response.data.result && response.data.message !== "success") { throw response.data }
		const cjConnectedProducts = response.data.data;
		return cjConnectedProducts;
	},

	getProductDetail: async function(productId) {
		const httpBody = [ productId.toString() ];
		const response = await axios.post("https://developers.cjdropshipping.com/api/product/queryProducts", httpBody, {
			headers: {
				"CJ-Access-Token": cjCredentials.apiKey
			}
		});
		if(!response.data || !response.data.length === 0) { throw "Cannot find CJ Connected Product details by ID" }
		const [ productDetail ] = response.data;
		return productDetail;
	}
};