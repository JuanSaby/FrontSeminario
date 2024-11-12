import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // Llama al método logout del AuthService
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si hay un token
}
}
