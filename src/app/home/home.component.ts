import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  animales: any[] = [];

  constructor(private animalService: AnimalService, private router: Router) {}

  ngOnInit(): void {
    this.animalService.getAnimales().subscribe(data => {
      this.animales = data;
    });
  }

  seleccionarAnimal(id: number) {
    this.router.navigate(['/animal', id]);
  }
}
