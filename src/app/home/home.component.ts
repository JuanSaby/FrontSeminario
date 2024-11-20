import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { esRefugio } from '../../assets/constants';
import { PublicacionServicess } from '../back/publicaciones.service';
import { Publicacion } from '../interfaces/publicaciones';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicaciones: any[] = []; // Cambiar a false si no es un refugio
  user: any; // Guardar los datos del usuario logeado

  constructor(private router: Router, private service: PublicacionServicess, authService:AuthService) {}

  ngOnInit(): void {
    this.getAllPublicaciones();
    this.getUserData(); // Obtener datos del usuario
    console.log('Usuario cargado:', this.user);
  }

  getUserData(): void {
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null; // Devuelve los datos del usuario o null
  }

  getAllPublicaciones(): void {
    this.service.getAllPublicaciones().subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = data;
      },
      error: (error: any) => {
        console.error('Error al obtener publicaciones:', error);
      }
    });
  }

  filtrarGatos(): void {
    this.service.getPublicacionesPorEspecie(2).subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = data;
      },
      error: (error: any) => {
        console.error('Error al filtrar gatos:', error);
      }
    });
  }

  filtrarPerros(): void {
    this.service.getPublicacionesPorEspecie(1).subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = data;
      },
      error: (error: any) => {
        console.error('Error al filtrar perros:', error);
      }
    });
  }

  seleccionarPublicacion(id: number) {
    if (esRefugio) {
      this.router.navigate(['/inicio-sesion']);
    } else {
      this.router.navigate(['/publicacion', id]);
    }
  }

  hasRole(roleId: number): boolean {
    console.log('Rol del usuario:', this.user?.role_id); // Verificar el rol
    return this.user?.role.id === roleId; // Verifica si el role_id coincide
}


  adoptar() {
    this.router.navigate(['/publicarMascota']);
  }
}
