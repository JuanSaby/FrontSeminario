import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { esRefugio } from '../../assets/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  animales: any[] = [];// Cambiar a false si no es un refugio

  constructor(private animalService: AnimalService, private router: Router) {}

  ngOnInit(): void {
    this.animalService.getAnimales().subscribe(data => {
      this.animales = data;
    });
  }

  seleccionarAnimal(id: number) {
    // Si es refugio, redirigir a inicio-sesion
    if (esRefugio) {
      this.router.navigate(['/inicio-sesion']);
    } else {
      // De lo contrario, redirigir al animal específico
      this.router.navigate(['/animal', id]);
    }
  }
}
