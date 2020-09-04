import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';
import { ProductNodejsService } from '../product-nodejs.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];
  constructor(private productService: ProductService,
    private productNodeService: ProductNodejsService,) { }

  ngOnInit(): void {
    this.fetchProductList('ProductList');
  }

  // fetch the product list from localstorage
  fetchProductList(locstrkey: string): void {
    this.productService.FetchProductList(locstrkey).subscribe(
      (data) => {
        this.productList = data.filter((item) => item.isDeleted === 0);
      },
      (error: any) => {}
    );

    // BAKCNED API CALL CODE
    // this.productNodeService.getProducts().subscribe(
    //   (data) => {
    //     this.productList = data;
    //   },
    //   (error: any) => { alert('error' + error); }
    // );
  }

  // delete product 
  deleteProduce(product) {
    if (
      confirm('Are you sure to delete Product : ' + product.name)
    ) {
      product.isDeleted = 1;
      this.productService
        .saveUpdateDetails(product, 'ProductList')
        .subscribe(
          (data) => {
            this.fetchProductList('ProductList');
          },
          (error: any) => { }
        );
    }


    // BAKCNED API CALL CODE
    //   if (
    //     confirm('Are you sure to delete Product : ' + product.name)
    //   ) {
    //     this.productNodeService.deleteProduct(product._id).subscribe(
    //       (data) => {
    //         this.fetchProductList('ProductList');
    //       },
    //       (error: any) => { alert('error in deleting' + error); }
    //       );
    // }

  }

}
