import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AnimalService } from '../services/animal.service';


@Component({
  selector: 'app-pres-animal',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './pres-animal.component.html',
  styleUrls: ['./pres-animal.component.css'],

})
export class PresAnimalComponent implements OnInit {
  animal: any;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');  // Obtenemos el ID desde la ruta
    this.animalService.getAnimalById(Number(id)).subscribe(data => {
      this.animal = data; // Aquí guardamos los detalles del animal
    });
  }
  // Método para manejar la adopción
  adoptar() {
    // Lógica para la adopción (puedes agregar un servicio o redireccionar)
    console.log(`Adopción solicitada para: ${this.animal.nombre}`);
    // Por ejemplo, redirigir a una página de confirmación
  }
}