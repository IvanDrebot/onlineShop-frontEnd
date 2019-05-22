import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {FilterServiceService} from '../../../services/filter-service.service';
import {Product} from '../../../models/Product';
import {ConfigService} from '../../../services/config.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  id = this.router.snapshot.params.id;
  singleProduct;
  wishList: any = [];
  count: any = [];

  constructor(
    private productService: ProductService,
    private filterService: FilterServiceService,
    private router: ActivatedRoute,
    private configService: ConfigService
  ) {
  }

  ngOnInit() {
    this.getProductById(this.id);
  }

  getProductById(id) {
    id = this.router.snapshot.params.id;
    this.productService.getProductById(id).subscribe((singleProduct) => {
      this.singleProduct = singleProduct;
      this.singleProduct.description = JSON.parse(this.singleProduct.description);
    });
  }

  AddProductToCart(product: Product) {
    this.wishList = JSON.parse(localStorage.getItem('wishList'));
    this.wishList.push(product);
    localStorage.setItem('wishList', JSON.stringify(this.wishList));
    this.count.push(product);
    this.filterService.wishList.next(this.count.length);
  }
}
