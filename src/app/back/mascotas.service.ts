import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable,from } from 'rxjs';
import { Mascota, Publicacion } from '../interfaces/publicaciones';

@Injectable({
  providedIn: 'root'
})
export class MascotaServicess {
    private url = 'http://localhost:3000/mascotas'; // Ajusta la URL según tu configuración de backend

  constructor() { }
  getAllMascotasasasas(refugioId: number): Observable<Mascota[]> {
    const url = `http://localhost:3000/users/${refugioId}/mascotas`;
    return from(axios.get<Mascota[]>(url).then((response) => response.data));
  }
  getAllMascotas(refugioId: number): Observable<Mascota[]> {
    return new Observable<Mascota[]>((observer) => {
        axios.get<Mascota[]>(`http://localhost:3000/users/${refugioId}/mascotas`)
            .then((response) => {
                observer.next(response.data);
                observer.complete();
            })
            .catch((error) => {
                observer.error(error);
            });
    });
  }
}