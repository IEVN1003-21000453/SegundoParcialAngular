
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MaestrosUTL } from "./maestrosUTL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {

  constructor(private http: HttpClient) { }

  public getMaestros(): Observable<MaestrosUTL[]> {
    return this.http.get<MaestrosUTL[]>(
      'http://127.0.0.1:5000/maestros'
    );
  }

  agregarNuevoMaestro(datos: MaestrosUTL): Observable<any> {
    return this.http.post(
      'http://127.0.0.1:5000/maestros',
      datos
    );
  }

  public getMaestro(id: string): Observable<MaestrosUTL> {
    console.log('ID Maestro: ' + id);

    return this.http.get<MaestrosUTL>(
      `http://127.0.0.1:5000/maestros/${id}`
    );
  }

  modificarMaestro(id: number, datos: MaestrosUTL): Observable<any> {
    return this.http.put(
      'http://127.0.0.1:5000/maestros/' + id,
      datos
    );
  }

  public EliminaMaestro(id: number): Observable<any> {
    return this.http.delete(
      'http://127.0.0.1:5000/maestros/' + id
    );
  }

}
