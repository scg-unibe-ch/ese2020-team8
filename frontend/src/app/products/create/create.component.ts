import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  uploadImages: FileList;

  productForm = this.fb.group({
    title: '',
    description: '',
    price: '',
    productType: '',
    purchaseType: '',
    availability: '',
    location: '',
    duration: '',
    delivery: ''
  });
  previewImages: any[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private imageService: ImageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.productService.create(this.productForm.value).subscribe((product) => {
      if (this.uploadImages && this.uploadImages.length) {
        this.imageService
          .upload(product.id, this.uploadImages)
          .subscribe((res) => {
            this.snackBar.open(
              'Successfully created advertisement. Wait for an admin to approve it'
            );
            this.router.navigate(['products', 'manage']);
          });
      } else {
        this.router.navigate(['products', 'manage']);
      }
    });
  }

  showAvailability(): boolean {
    return (
      this.productForm.get('productType').value === 'service' ||
      (this.productForm.get('productType').value === 'good' &&
        this.productForm.get('purchaseType').value === 'rent')
    );
  }

  onFileChange(event): void {
    const files = event.target.files;
    if (files && files.length) {
      this.uploadImages = files;
      this.createPreviews(files);
    }
  }

  createPreviews(files: FileList) {
    this.previewImages = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImages.push({
          file,
          result: reader.result,
        });
      };
    });
  }
}
