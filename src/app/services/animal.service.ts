import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Importamos el array de animales
import { ANIMALES } from '../../assets/data/animales-data';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animales = ANIMALES;

  constructor() {}

  // Método para obtener todos los animales
  getAnimales(): Observable<any[]> {
    return of(this.animales);
  }

  // Método para buscar un animal por su ID
  getAnimalById(id: number): Observable<any | undefined> {
    const animal = this.animales.find(a => a.id === id);
    console.log(animal);
    return of(animal);
  }
}
