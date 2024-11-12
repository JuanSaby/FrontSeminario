import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { esRefugio } from '../../assets/constants';
import { PublicacionServicess } from '../back/publicaciones.service';
import { Publicacion } from '../interfaces/publicaciones';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicaciones: any[] = [];// Cambiar a false si no es un refugio
  user:any

  constructor(private router: Router, private service:PublicacionServicess) {
    //this.user = this.getUserData();
  }

  ngOnInit(): void {
    this.getAllPublicaciones();
}
//getUserData() {
//    const userData = localStorage.getItem('user');
//    return userData ? JSON.parse(userData) : null; // Devuelve los datos del usuario o null
//}
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
    // Si es refugio, redirigir a inicio-sesion
    if (esRefugio) {
      this.router.navigate(['/inicio-sesion']);
    } else {
      // De lo contrario, redirigir al animal específico
      this.router.navigate(['/publicacion', id]);
    }
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si hay un token
}

hasRole(roleId: number): boolean {
    return this.user?.role_id === roleId; // Verifica si el role_id coincide
}

adoptar() {
    if (this.isLoggedIn()) {
        console.log(`Adopción solicitada para: ${this.user?.name}`); // Usa los datos del usuario
        // Lógica adicional para la adopción
}
}
}