import productData from "../testdata/products.json"

type productData = {
    name: string,
    searchItem: string,
    categoryValue?: string,
    brand?: string,
    defaultQuantity?: string,
    productCode?: string,
    availability?: string,
    successMessage?: string
}
export class JSONUtils {
    static getProductDetails(tcId: string): productData {
        const product = productData.find(d => d.tcId === tcId)?.products?.[0];

        if (!product) {
            throw new Error(`Product name not found for TCID: ${tcId}`);
        }

        return product;
    }

}