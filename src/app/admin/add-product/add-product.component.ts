import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {NgForm} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {Producer} from '../../../models/Producer';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: any = {};
  category: any = [];
  producer: Producer[] = [];
  imagePreview: any;
  image: File;
  position: [] = [];

  constructor(
    private categoryService: CategoryService,
    private adminService: AdminService,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((res) => {
      this.category = res;
    });
    this.productService.getProducer().subscribe((res) => {
      this.producer = res;
    });
  }

  createProduct(form: NgForm) {
    const {price, producer, category, image, brand, ...others} = form.value;
    const shortDescription = {price, producer, category, image, brand};
    this.product = shortDescription;
    this.product.description = others;
    this.product.category = this.category._id;
    this.adminService.createProduct(this.product, this.image).subscribe((res) => {
      this.product = res;
    });
  }

  fileUpload($event: any) {
   // @ts-ignore
    const file = event.target.files[0];
   this.image = file;
   const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result;
   };
   reader.readAsDataURL(file);
  }

  selectCategory(item) {
    this.category = item;
    this.position = item.description[0].split(',');
  }
}
