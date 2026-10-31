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

  agregarNuevoAlumno(datos: MaestrosUTL) {
    return this.http.post(
      'http://127.0.0.1:5000/maestros',
      datos
    );
  }
}