import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  loginForm: FormGroup;
  submitted=false
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route:Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted=true
    if (this.loginForm.invalid) {
      return;
    }
    try {
      console.log(this.loginForm)
      await this.authService.login(this.loginForm.value);
      this.route.navigate(['home'])
    } catch (error: any) {
      console.log(error)
      alert('Error en el inicio de sesión');
    }
  }

  async registrar(){
    this.route.navigate(['/crear-cuenta'])
  }
}
