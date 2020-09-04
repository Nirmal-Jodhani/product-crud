import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductNodejsService {

  private apiUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteProduct(id): Observable<any[]> {

    return this.http.delete<any[]>(this.apiUrl + '/' + id)
  }

  getProduct(id): Observable<any> {

    return this.http.get<any[]>(this.apiUrl + '/' + id)
  }

  createProduct(product): Observable<any> {

    return this.http.post<any[]>(this.apiUrl, product)
  }

  updateProduct(product): Observable<any> {

    return this.http.put<any>(this.apiUrl + '/' + product.id, product)
  }

}
