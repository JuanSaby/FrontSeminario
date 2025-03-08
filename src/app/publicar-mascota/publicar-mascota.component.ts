import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MascotaServicess } from '../back/mascotas.service';
import { Mascota } from '../interfaces/publicaciones';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-publicar-mascota',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './publicar-mascota.component.html',
  styleUrl: './publicar-mascota.component.css'
})
export class PublicarMascotaComponent implements OnInit {
  publicarForm: FormGroup;
  mascotas: Mascota[] = [];
  ciudades = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Villa María'];
  mascotaRegistrada: boolean = false; // Nueva variable para habilitar el botón

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: MascotaServicess,
    private authService: AuthService
  ) {
    this.publicarForm = this.fb.group({
      mascota: ['', Validators.required],
      ciudad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarMascotas();

    // Verificar si al regresar de registrar mascota hay una nueva
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['mascotaRegistrada']) {
      this.mascotaRegistrada = true;
    }
  }

  cargarMascotas(): void {
    const refugioId = this.authService.getUserId();

    if (refugioId !== null) {
      this.service.getAllMascotas(refugioId).subscribe({
        next: (data: Mascota[]) => {
          this.mascotas = data;
          console.log('Mascotas cargadas:', this.mascotas);
        },
        error: (error: any) => {
          console.error('Error al obtener mascotas:', error);
        },
      });
    } else {
      console.error('No se pudo obtener el ID del usuario logueado.');
    }
  }

  irARegistrarMascota(): void {
    // Navega a la pantalla de registrar mascota y espera una actualización
    const navigationExtras: NavigationExtras = {
      state: { mascotaRegistrada: true }
    };
    this.router.navigate(['/registrar-mascota'], navigationExtras);
  }

  volverAlHome(): void {
    this.router.navigate(['/home']); // Redirige al usuario a la pantalla principal
  }

  onSubmit(): void {
    if (this.publicarForm.valid && this.mascotaRegistrada) {
      console.log('Formulario enviado:', this.publicarForm.value);
      alert('¡Mascota publicada exitosamente!');
      this.router.navigate(['/home']); // Opcional: redirigir después de publicar
    }
  }
}

