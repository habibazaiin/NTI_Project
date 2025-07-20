import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Login success');

        // 🌟 خزني التوكن
        localStorage.setItem('token', res.token);

        // 🌟 حسب الدور
        if (res.role === 'admin') {
          this.router.navigate(['/admin-home']);
        } else {
          this.router.navigate(['/user-home']);
        }
      },
      error: err => {
        console.error(err);
        if (err.error?.error) {
          alert(err.error.error);
        } else {
          alert('Login failed');
        }
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
