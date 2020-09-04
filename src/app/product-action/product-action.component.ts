import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';
import { ProductNodejsService } from '../product-nodejs.service';

@Component({
  selector: 'app-product-action',
  templateUrl: './product-action.component.html',
  styleUrls: ['./product-action.component.scss']
})
export class ProductActionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productNodeService: ProductNodejsService,
  ) { }

  // declarations
  productForm: FormGroup;

  // regular expression for url validation
  regexForImageUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  // product category
  productCategory: any = [
    {
      name: 'Food',
      value: 'food',
    },
    {
      name: 'Fashion',
      value: 'fashion',
    },
    {
      name: 'Mobile',
      value: 'mobile',
    },
  ];

  ngOnInit(): void {
    this.initializeFormControl();

    // fetching the product id from the route url
    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    if (productId) {
      this.fetchProductDetails(productId, 'ProductList');
    }

  }

  // fetch product details and patch the form value
  fetchProductDetails(productId, locastrKey: string): void {


    this.productService.fetchProductDataById(productId, locastrKey).subscribe(
      (data) => {
        if (String(data) !== 'undefined' || data !== undefined) {
          this.productForm.patchValue(data);
        } else {
          alert('Product is not available: Please choose another product');
          this.router.navigate(['/productList']);
        }
      },
      (error: any) => { }
    );

    // BAKCNED API CALL CODE
    // this.productNodeService.getProduct(productId).subscribe(
    //   (data) => {
    //     this.productForm.patchValue(data);
    //     this.productForm.get('id').setValue(data._id);
    //   }
    // );
  }

  // creating form control array for the multiple categories
  createCategories(categories) {
    const arr = categories.map((category) => {
      return new FormControl(false);
    });
    console.log('form array', arr);
    return new FormArray(arr);
  }

  // to get the form controlsd
  get productFormControl() {
    return this.productForm.controls;
  }

  // inintialize the form
  initializeFormControl() {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(50)])],
      imageUrl: ['', Validators.compose([Validators.required, Validators.pattern(this.regexForImageUrl)])],
      category: this.createCategories(this.productCategory),
      price: ['', Validators.required],
      profit: [''],
      isDeleted: [0],
    });
  }

  // save product details
  SaveUpdateProduct(): void {

    if (!this.productForm.valid) {
      Object.keys(this.productForm.controls).forEach(field => {
        const control = this.productForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this.productForm.value.category = this.getCategories();

    this.productService
      .saveUpdateDetails(this.productForm.value, 'ProductList')
      .subscribe(
        (data) => {
          this.router.navigate(['/productList']);
        },
        (error: any) => { alert('Product not added successfully'); }
      );

    // BAKCNED API CALL CODE
    // if (this.productForm.value.id !== null) {

    //   this.productNodeService.updateProduct(this.productForm.value).subscribe((data) => {
    //     this.router.navigate(['/productList']);
    //   },
    //     (err: any) => {
    //       alert('error' + err);
    //     }
    //   );
    // } else {
    //   this.productNodeService.createProduct(this.productForm.value).subscribe(
    //     (data) => {
    //       this.router.navigate(['/productList']);
    //     },
    //     (err: any) => {
    //       alert('error' + err);
    //     }
    //   );
    // }

  }

  // return categories selected in form
  getCategories() {
    let categories = [];
    let categoryFormValue = this.productForm.value.category;

    for (let i = 0; i < categoryFormValue.length; i++) {
      if (categoryFormValue[i]) {
        categories.push(this.productCategory[i].value);
      }
    }
    return categories;
  }

}
