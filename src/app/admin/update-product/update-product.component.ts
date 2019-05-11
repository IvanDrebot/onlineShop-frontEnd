import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/Product';
import {AdminService} from '../../../services/admin.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FilterServiceService} from '../../../services/filter-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product[] = [];
  query: any = {
    limit: 5,
    skip: 0};
  deleteInfo;
  category: any = [];
  producer: any = [];

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterServiceService
  ) { }

  ngOnInit() {
    this.getCategory();
    this.getProducer();
    this.getAllProduct(this.query);
  }


  getCategory() {
    this.productService.getAllCategory().subscribe((res) => {
      this.category = res;
    });
  }

  getProducer() {
    this.productService.getProducer().subscribe((res) => {
      this.producer = res;
    });
  }

  getAllProduct(query) {
    this.productService.getAllProduct(query).subscribe((res) => {
      // @ts-ignore
      this.product = res.products;
    });
  }

  deleteProduct(id) {
    this.adminService.deleteProduct(id).subscribe((res) => {
      this.deleteInfo = res;
      this.getAllProduct(this.query);
    });
  }

  nextPage(number) {
    this.query.skip += number;
    this.getAllProduct(this.query);
  }

  previosPage(number) {
    this.query.skip += number;
    this.getAllProduct(this.query);
  }


  getId(id: any) {
    this.filterService.updateProduct.next(id);
  }
}
