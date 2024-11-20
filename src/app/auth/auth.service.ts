import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import moment from 'moment';
import { __await } from 'tslib';
import { LoginI, RegisterI, TokenI } from '../interfaces/token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000';
  user: any; // Guardar los datos del usuario logeado
  constructor() {}

  async login(body: LoginI): Promise<TokenI> {
    try {
        const response = (await axios.post(`${this.url}/login`, body)).data;

        // Almacena el token y los datos del usuario en el almacenamiento local
        localStorage.setItem('token', JSON.stringify(response.token)); // Almacena solo el token
        localStorage.setItem('user', JSON.stringify(response.user)); // Almacena los datos del usuario

        const time = moment(response.expirationTime).diff(moment());
        timer(time * 0.5).subscribe(async () => {
            await this.refreshToken();
        });

        console.log('Adentro');
        return response; // Devuelve la respuesta completa si es necesario
    } catch (error) {
        throw new HttpErrorResponse({ error });
    }
}


  async refreshToken() {
    const tokenObject: { refreshToken: string; accessToken?: string } = JSON.parse(localStorage.getItem('token') ?? '{"refreshToken":""}');
    if (!tokenObject.refreshToken) {
      throw new Error('No refresh token found');
    }
    try {
      const response = await axios.get(`${this.url}/refresh-token`, {
        headers: {
          'refresh-token': tokenObject.refreshToken
        },
      });
      tokenObject.accessToken = response.data.accessToken;
      localStorage.setItem('token', JSON.stringify(tokenObject));
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle error appropriately, maybe throw or show a message to the user
    }
  }
  async register(body: RegisterI): Promise<void> {
    try {
      return (await axios.post(`${this.url}/register`, body)).data;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }
  logout(): void {
    localStorage.removeItem('token')
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si hay un token
  }
  getUserData(): void {
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
  }
  
  getUserId(): number | null {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.id || null; // Asegúrate de que `user.id` sea el ID del refugio
    }
    return null;
  }
  
}