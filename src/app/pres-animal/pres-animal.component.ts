import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { PublicacionServicess } from '../back/publicaciones.service';
import { Publicacion } from '../interfaces/publicaciones';
import { AuthService } from '../auth/auth.service';
import { HeaderComponent } from '../shared/header/header.component';


@Component({
  selector: 'app-pres-animal',
  standalone: true,
  imports:[CommonModule, RouterModule,HeaderComponent],
  templateUrl: './pres-animal.component.html',
  styleUrls: ['./pres-animal.component.css'],

})
export class PresAnimalComponent implements OnInit {
  publicacion:Publicacion|undefined

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service:PublicacionServicess,
    private authService:AuthService
  ) {}

 ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  console.log('ID obtenido:', id); // Verifica el ID
  if (id) {
    this.service.getPublicacionById(Number(id)).subscribe(
      data => {
        this.publicacion = data;
        console.log('Datos de la publicación:', this.publicacion); // Verifica los datos recibidos
      },
      error => {
        console.error('Error al obtener la publicación:', error);
      }
    );
  }
}
adoptar() {
  const token = localStorage.getItem('token');
  if (token) {
      console.log(`Adopción solicitada para: ${this.publicacion?.mascota.name}`);
      this.router.navigate(['/home'])
      // Aquí puedes redirigir a una página de confirmación o realizar la lógica de adopción
  } else {
      console.warn('El usuario no está logueado. Redirigiendo a la página de inicio de sesión.');
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/inicio-sesion']);
  }
}

}