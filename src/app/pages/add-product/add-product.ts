import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']
})
export class AddProduct {
  product = {
    name: '',
    price: '',
    description: ''
  };
  selectedFile: File | null = null;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSave() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.api.addProduct(formData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/admin-home']);
      },
      error: err => {
        console.error(err);
        alert('Failed to add product');
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin-home']);
  }
}
