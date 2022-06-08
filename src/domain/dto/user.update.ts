export interface UserUpdate {
  id: string;
  dni: string;
  nombres: string;
  apellidos: string;
  correo: string;
  password: string;
  fecha_nac: string;
  genero: string;
  direccion: string;
  num_telefonico: string;
  rol: number;
  status: string;
  especialidad?: number;
}