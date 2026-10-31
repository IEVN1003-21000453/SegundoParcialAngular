export interface MaestrosUTL {
  idmaestro: number;
  nombre: string;
  apaterno: string;
  amaterno: string;
  correo: string;
}

export interface RespuestaMaestros {
  maestros: MaestrosUTL[];
  exito: boolean;
  mensaje: string;
}