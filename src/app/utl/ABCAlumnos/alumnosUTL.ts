export interface AlumnosUTL {
  matricula:number;
  nombre:string;
  apaterno:string;
  amaterno:string;
  correo:string;
}
export interface RespuestaAlumnos {
  alumnos: AlumnosUTL[];
  exito: boolean;
  mensaje:string;
}