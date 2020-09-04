import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  ProductList: Product[] = [];

  // Check Whether local Storage with specific key is available or not
  CheckLocalStorageExists(keytomatch: string): boolean {
    if (localStorage.getItem(keytomatch) === null) {
      return false;
    } else {
      return true;
    }
  }


  // get productlist in global variable
  getProductList(localstrkey: string) {
    this.ProductList = JSON.parse(localStorage.getItem(localstrkey));
  }

  // set the localstorage Items
  setProductList(localstrkey: string) {
    localStorage.setItem(localstrkey, JSON.stringify(this.ProductList));
  }


  //Get the products list
  FetchProductList(locstrKey: string): Observable<Product[]> {
    if (this.CheckLocalStorageExists(locstrKey)) {
      this.getProductList(locstrKey);
    }
    return of(this.ProductList);
  }


  // Fetch the product Details By Product Id
  fetchProductDataById(
    productId: number,
    localstrkey: string
  ): Observable<Product> {
    this.getProductList(localstrkey);
    const singleProductDetail = this.ProductList.find(
      (item) => item.id == productId
    );
    return of(singleProductDetail);
  }

  // Save OR Edit Product Details
  saveUpdateDetails(
    productDetails: Product,
    localstrkey: string
  ): Observable<Product> {
    if (!this.CheckLocalStorageExists(localstrkey)) {
      productDetails.id = 1;
      this.ProductList.push(productDetails);
    } else {
      this.getProductList(localstrkey);
      if (productDetails.id == null) {
        productDetails.id =
          this.ProductList[this.ProductList.length - 1].id +
          1;
        this.ProductList.push(productDetails);
      } else {
        const productInddex = this.ProductList.findIndex(
          (element) => element.id == productDetails.id
        );
        this.ProductList[productInddex] = productDetails;
      }
    }
    this.setProductList(localstrkey);
    return of(productDetails);
  }
}
