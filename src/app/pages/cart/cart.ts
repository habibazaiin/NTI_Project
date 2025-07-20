import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cart: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.api.getCart().subscribe({
      next: (data: any) => {
        // إذا الـ backend يرجّع مصفوفة مباشرة
        if (Array.isArray(data)) {
          this.cart = data;
        } else if (data.products) {
          this.cart = data.products;
        } else {
          console.error('Unexpected cart response:', data);
          this.cart = [];
        }
      },
      error: err => {
        console.error(err);
        alert('❌ Failed to load cart');
      }
    });
  }

  removeFromCart(productId: string) {
    this.api.removeFromCart(productId).subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.cart = response;
        } else if (response.products) {
          this.cart = response.products;
        } else {
          console.error('Unexpected response after remove:', response);
        }
        alert('✅ Removed from cart');
      },
      error: err => {
        console.error(err);
        alert('❌ Failed to remove item');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
