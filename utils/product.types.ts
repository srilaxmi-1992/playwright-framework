export type ProductData = {
  name: string;
  searchItem: string;
  categoryValue?: string;
  brand?: string;
  defaultQuantity?: string;
  productCode?: string;
  availability?: string;
  successMessage?: string;
};

export type ProductTestData = {
  tcId: string;
  products: ProductData[];
};