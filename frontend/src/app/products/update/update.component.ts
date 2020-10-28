import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService } from '../products.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  productId: string;

  productForm = this.fb.group({
    title: '',
    description: '',
    price: '',
    productType: '',
    purchaseType: '',
    availability: '',
    location: '',
    delivery: ''
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.get(productId).subscribe( product  => {
      this.productId = product.id;
      this.productForm.patchValue(product);
    });
  }

  showAvailability(): boolean {
    return this.productForm.get('productType').value === 'service' ||
      this.productForm.get('productType').value === 'good' &&
      this.productForm.get('purchaseType').value  === 'rent';
  }

  onSubmit(): void {
    this.productService.update(
        this.productId,
        this.productForm.value
    ).subscribe( () => {
      this.snackBar.open('Successfully updated advertisement. Wait for an admin to approve it');
      this.router.navigate(['products']);
    });
  }

}
