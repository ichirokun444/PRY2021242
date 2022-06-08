export interface UserSave {
  dni: string;
  nombres: string;
  apellidos: string;
  correo: string;
  fecha_nac: string;
  genero: string;
  direccion: string;
  num_telefonico: string;
  rol: number;
  especialidad?: number;
}