import fs from 'fs';
import { BookingTestData } from "../utils/booking.types";
import { ProductTestData } from "../utils/product.types";


export class JSONUtils {

  static readJsonFile<T>(filePath: string): T {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  }

  static getByTcId<T extends { tcId: string }>(filePath: string, tcId: string): T {

    const data = this.readJsonFile<T[]>(filePath);
    const record = data.find(d => d.tcId === tcId);
    if (!record) {
      throw new Error(`No data found for TCID: ${tcId}`);
    }

    return record;
  }

  static getBooking(tcId: string) {
    const booking = JSONUtils.getByTcId<BookingTestData>(
      './testdata/bookings.json',
      tcId
    );
    return booking
  }

  static getProducts(tcId: string) {
    const product = JSONUtils.getByTcId<ProductTestData>(
      './testdata/products.json',
      tcId
    );
    return product.products
  }


  static getProductDetails(tcId: string) {
    const product = JSONUtils.getByTcId<ProductTestData>(
      './testdata/products.json',
      tcId
    );
    return product.products[0]
  }
}