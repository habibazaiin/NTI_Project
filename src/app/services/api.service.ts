import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  login(userData: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, userData);
  }

  getProducts() {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getProductById(productId: string) {
    return this.http.get(`${this.baseUrl}/products/${productId}`);
  }

  addProduct(formData: FormData) {
    return this.http.post(`${this.baseUrl}/products`, formData);
  }

  updateProduct(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/products/${id}`, data);
  }

  deleteProduct(productId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/products/${productId}`, { headers });
  }

  addToCart(productId: string, quantity = 1) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(
      `${this.baseUrl}/cart`,
      { productId, quantity },
      { headers }
    );
  }

  getCart() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/cart`, { headers });
  }

  removeFromCart(productId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/cart/${productId}`, { headers });
  }
}
