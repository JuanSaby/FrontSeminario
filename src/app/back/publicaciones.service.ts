import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Publicacion } from '../interfaces/publicaciones';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionServicess {

  private url = 'http://localhost:3000/publicacion'; // Ajusta la URL según tu configuración de backend

  constructor() { }

  getAllPublicaciones(): Observable<Publicacion[]> {
    return new Observable<Publicacion[]>((observer) => {
      axios.get<Publicacion[]>(this.url)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
getPublicacionesPorEspecie(especieId: number): Observable<Publicacion[]> {
  return new Observable<Publicacion[]>((observer) => {
      axios.get<Publicacion[]>(`${this.url}?especie=${especieId}`)
          .then((response) => {
              observer.next(response.data);
              observer.complete();
          })
          .catch((error) => {
              observer.error(error);
          });
  });
}
// Obtener una publicación por ID
getPublicacionById(id: number): Observable<Publicacion> {
  return new Observable<Publicacion>((observer) => {
    axios.get<Publicacion[]>(`http://localhost:3000/publicacion/${id}`)
      .then((response) => {
        if (response.data.length > 0) {
          observer.next(response.data[0]); // Devuelve el primer objeto del array
        } else {
          observer.error('No se encontraron datos');
        }
        observer.complete();
      })
      .catch((error) => {
        observer.error(error); // Maneja los errores si ocurren
      });
  });
}

}