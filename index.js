const dotenv = require("dotenv");
dotenvResult = dotenv.config();
if(dotenvResult.error) {
	throw dotenvResult.error;
}
const print = require("./helpers/print");
print.welcome();
if(!process.env.CJ_API_KEY || !process.env.SHOPEE_SHOP_ID || !process.env.SHOPEE_PARTNER_ID || !process.env.SHOPEE_PARTNER_KEY) {
	print.envNotSet();
	process.exit(0);
}
print.printEnv();

const fs = require("fs");
const path = require("path");
const shopeeAPI = require('./helpers/shopeeAPI');
const cjAPI = require('./helpers/cjAPI');

print.shopeeLoginURL();

(async () => {
	let shopeeProducts;
	let cjConnectedProducts



	// Get shopee products
	console.log(`
Fetching Shopee products...`);
	try {
		shopeeProducts = await shopeeAPI.getAllProducts();
		fs.writeFileSync(path.join(__dirname, "/shopeeProducts.log"), JSON.stringify(shopeeProducts, null, 2));
		console.log(`Finish.
========================
`);
	} catch(error) {
		console.error(error);
	}



	// Get CJ connected products
	try {
		console.log(`Fethcing CJ Products...`);
		cjConnectedProducts = await cjAPI.getConnetedProudcts();
		fs.writeFileSync(path.join(__dirname, "/cjProducts.log"), JSON.stringify(cjConnectedProducts, null, 2));
		console.log(`Finish.
========================
`);
	} catch(error) {
		console.error(error);
	}



	// updating stock
	for(let shopeeProduct of shopeeProducts) {
		if(shopeeProduct.variations.length ===  0) {
			const cjConnectedProduct = cjConnectedProducts.find(item => item.sku === shopeeProduct.item_sku);
			if(!cjConnectedProduct) { console.log(`❌ cannot find connected product based on sku: ${shopeeProduct.item_sku}`); continue; }
			const cjProductDetail = await cjAPI.getProductDetail(cjConnectedProduct.productId);
			const cjVariant = cjProductDetail.variants.find(item => item.sku === shopeeProduct.item_sku);
			if(!cjVariant) { throw "cannot find cj variant based on sku"; }
			await shopeeAPI.updateProductStock({ productId: shopeeProduct.item_id, stock: parseInt(cjVariant.oldInventoryQuantity) });
			continue;
		}
		let cjConnectedProduct;
		let cjProductDetail
		for(let shopeeVariation of shopeeProduct.variations) {
			if(!cjConnectedProduct) {
				cjConnectedProduct = cjConnectedProducts.find(item => item.sku === shopeeVariation.variation_sku);
				if(!cjConnectedProduct) { console.log(`❌ cannot find connected product (variants) based on sku: ${shopeeVariation.variation_sku}`); continue; }
				cjProductDetail = await cjAPI.getProductDetail(cjConnectedProduct.productId);
				if(!cjProductDetail) { throw "cannot get product detail from CJ API"; }
			}
			const cjVariant = cjProductDetail.variants.find(item => item.sku === shopeeVariation.variation_sku);
			if(!cjVariant) { throw "cannot find cj variant based on sku"; }
			await shopeeAPI.updateVariationStock({ productId: shopeeProduct.item_id, variationId: shopeeVariation.variation_id, stock: parseInt(cjVariant.oldInventoryQuantity) });
		}
	}
})();
