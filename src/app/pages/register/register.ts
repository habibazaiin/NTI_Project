import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';
  role = 'user'; // default

  constructor(private api: ApiService, private router: Router) {}

  onRegister() {
    const user = { 
      name: this.name, 
      email: this.email, 
      password: this.password,
      role: this.role
    };

    this.api.register(user).subscribe({
      next: res => { 
        console.log('Registered', res); 
        alert('Registered Successfully!'); 
      },
      error: err => { 
        console.error(err); 
        alert('Registration Failed!'); 
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
