import { Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { PresAnimalComponent } from '../app/pres-animal/pres-animal.component';
import { InicioSesionComponent } from '../app/inicio-sesion/inicio-sesion.component';

export const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },  // Página principal con la lista de animales
  { path: 'pres-animal', component: PresAnimalComponent},
  { path:'inicio-sesion', component: InicioSesionComponent},
  //{ path: 'animal/:id', component: PresAnimalComponent },  // Detalle del animal seleccionado
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];
