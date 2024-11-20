import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-mascota',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent,ReactiveFormsModule],
  templateUrl: './registrar-mascota.component.html',
  styleUrl: './registrar-mascota.component.css'
})
export class RegistrarMascotaComponent {

}
