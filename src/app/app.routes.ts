import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PresAnimalComponent } from './pres-animal/pres-animal.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'publicacion/:id', component: PresAnimalComponent },
  { path:'inicio-sesion', component: InicioSesionComponent},
  {path: 'crear-cuenta', component: CrearCuentaComponent},
  {path: 'sobre-nosotros', component: SobreNosotrosComponent},
  {path: 'mi-perfil', component: MiPerfilComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];





