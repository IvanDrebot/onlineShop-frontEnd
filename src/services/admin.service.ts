import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/Product';
import {Category} from '../models/Category';
import {Producer} from '../models/Producer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  categoryUrl = 'http://localhost:3000/api/category';
  producerUrl = 'http://localhost:3000/api/producer';
  adminUrl = 'http://localhost:3000/api/admin';

  constructor(
    private http: HttpClient,
    private router: ActivatedRoute) {
  }

  createProduct(product: Product) {
    return this.http.post(this.adminUrl, product);
  }

  createCategory(category: Category) {
    return this.http.post(this.categoryUrl, category);
  }

  createProducer(producer: Producer) {
    return this.http.post(this.producerUrl, producer);
  }

  deleteProducer(id: any) {
    return this.http.delete(this.producerUrl + '/' + id);
  }

  deleteCategory(url: any) {
    return this.http.delete(this.categoryUrl, url);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.adminUrl + '/' + id);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(this.adminUrl + '/' + id, product);
  }

  getCountOfProduct() {
    return this.http.get(this.adminUrl);
  }
}
