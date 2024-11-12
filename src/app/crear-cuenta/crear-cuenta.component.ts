import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {
    // Configuración inicial del formulario
    this.registerForm = this.formBuilder.group({
      userType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],  // Se valida solo para adoptante
      description: [''],  // Se valida solo para refugio
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    // Cambiar validaciones según el tipo de usuario
    this.registerForm.get('userType')?.valueChanges.subscribe((userType) => {
      if (userType === 'adoptante') {
        this.registerForm.get('lastName')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.registerForm.get('description')?.clearValidators();
      } else if (userType === 'refugio') {
        this.registerForm.get('description')?.setValidators([Validators.required, Validators.minLength(10)]);
        this.registerForm.get('lastName')?.clearValidators();
      }
      this.registerForm.get('lastName')?.updateValueAndValidity();
      this.registerForm.get('description')?.updateValueAndValidity();
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    try {
      console.log(this.registerForm.value);
      await this.authService.register(this.registerForm.value);
      alert('Usuario creado con éxito');
      this.route.navigate(['home']);
    } catch (error: any) {
      console.error(error);
      alert('Error en el registro');
    }
  }
}
