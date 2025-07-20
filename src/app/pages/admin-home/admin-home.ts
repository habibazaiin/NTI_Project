import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-home.html',
  styleUrls: ['./admin-home.css']
})
export class AdminHome implements OnInit {
  products: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: err => {
        console.error(err);
        alert('Failed to load products');
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  addProduct() {
  this.router.navigate(['/add-product']);
  }


  deleteProduct(productId: string) {
  if (confirm('Are you sure you want to delete this product?')) {
    this.api.deleteProduct(productId).subscribe({
      next: () => {
        alert('Product deleted successfully');
        this.products = this.products.filter(p => p._id !== productId);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete product');
      }
    });
  }
}
updateProduct(productId: string) {
  this.router.navigate(['/update-product', productId]);
}

}
