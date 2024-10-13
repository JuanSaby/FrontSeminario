import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private url = 'assets/data/animales.json';  // Ruta al archivo JSON

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de todos los animales
  getAnimales(): Observable<any> {
    return this.http.get(this.url);
  }

  // Método para obtener un animal por su ID
  getAnimalById(id: number): Observable<any> {
    return this.http.get<any[]>('assets/data/animales.json').pipe(
      map((animales: any[]) => animales.find(animal => animal.id === id))
    );
  }  
}


