import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MascotaServicess } from '../back/mascotas.service';
import { Mascota } from '../interfaces/publicaciones';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-publicar-mascota',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent,ReactiveFormsModule],
  templateUrl: './publicar-mascota.component.html',
  styleUrl: './publicar-mascota.component.css'
})
export class PublicarMascotaComponent implements OnInit {
  publicarForm: FormGroup;
  mascotas: Mascota[] = [];
  ciudades = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Villa María'];

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
  }

  cargarMascotas(): void {
    const refugioId = this.authService.getUserId();

    if (refugioId !== null) {
      this.service.getAllMascotas(refugioId).subscribe({
        next: (data: Mascota[]) => {
          this.mascotas = data;
          console.log('Mascotas cargadas:', this.mascotas);
          console.log('Mascotas en el componente:', this.mascotas);

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
    this.router.navigate(['/registrar-mascota']);
  }

  onSubmit(): void {
    if (this.publicarForm.valid) {
      console.log(this.publicarForm.value);
      alert('¡Mascota publicada exitosamente!');
    }
  }
}
