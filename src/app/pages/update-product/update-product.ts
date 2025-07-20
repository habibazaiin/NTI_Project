import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.html',
  styleUrls: ['./update-product.css']
})
export class UpdateProduct implements OnInit {
  productId = '';
  product: any = {
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  };
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.api.getProductById(this.productId).subscribe({
      next: (data: any) => {
        this.product = data;
      },
      error: err => {
        console.error(err);
        alert('Failed to load product');
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdate() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price);
    formData.append('description', this.product.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.api.updateProduct(this.productId, formData).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.router.navigate(['/admin-home']);
      },
      error: err => {
        console.error(err);
        alert('Failed to update product');
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin-home']);
  }
}
