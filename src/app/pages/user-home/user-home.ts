import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-home.html',
  styleUrls: ['./user-home.css']
})
export class UserHome implements OnInit {
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
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  addToCart(productId: string) {
    this.api.addToCart(productId).subscribe({
      next: () => {
        alert('✅ Product added to cart!');
      },
      error: err => {
        console.error(err);
        alert('❌ Failed to add to cart');
      }
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
