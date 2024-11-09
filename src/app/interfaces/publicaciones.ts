// publicaciones.ts
export interface Publicacion {
    id: number;
    fecha: Date;
    Ciudad: string;
    mascota: {
      id: number;
      name:string;
      especie:Especie;
      peso: number;
      tamanio: string;
      fechaIngreso: Date;
      edad: number;
      vacunado: boolean;
      castrado: boolean;
      estadoSalud: number;
      raza: number;
    };
    estado: {
      id: number;
      nombre: string;
    };
    refugio: {
      id: number;
      nombre: string;
    };
    imagen?: string;
  }
  

export interface Especie{
  id:number;
  name:string;
}