// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo HTTP para hacer peticiones
import { AppComponent } from './app.component'; // Asegúrate de que el componente principal esté importado
import { HomeComponent } from './home/home.component'; // Importa tu HomeComponent, o el componente de inicio

@NgModule({
  declarations: [
    AppComponent,    // Declara el AppComponent
    HomeComponent    // Declara HomeComponent o el componente que estés usando en tu página principal
  ],
  imports: [
    BrowserModule,   // Este módulo es esencial para aplicaciones en el navegador
  ],
  providers: [], // Puedes añadir servicios globales aquí si es necesario
  bootstrap: [AppComponent] // Componente principal de arranque
})
export class AppModule { }
