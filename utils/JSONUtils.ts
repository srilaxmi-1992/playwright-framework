import productsJson from "../testdata/products.json";

type ProductData = {
  name: string;
  searchItem: string;
  categoryValue?: string;
  brand?: string;
  defaultQuantity?: string;
  productCode?: string;
  availability?: string;
  successMessage?: string;
};

type ProductTestData = {
  tcId: string;
  products: ProductData[];
};

const data = productsJson as ProductTestData[];

export class JSONUtils {

  static getProductDetails(tcId: string): ProductData {
    const testCase = data.find(d => d.tcId === tcId);

    if (!testCase || !testCase.products.length) {
      throw new Error(`No product found for TCID: ${tcId}`);
    }

    return testCase.products[0];
  }

  static getProducts(tcId: string): ProductData[] {
    const testCase = data.find(d => d.tcId === tcId);

    if (!testCase) {
      throw new Error(`TCID not found: ${tcId}`);
    }
    
    return testCase.products;
  }
}
