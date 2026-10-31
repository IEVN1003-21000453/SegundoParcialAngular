import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlumnosUTL, RespuestaAlumnos } from "./alumnosUTL";
import { Observable } from "rxjs";
 
@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {
  constructor(private http: HttpClient) { }
 
  public getAlumnos():Observable<AlumnosUTL[]>{
    return this.http.get<AlumnosUTL[]>
    ('http://127.0.0.1:5000/api/alumnos')
  }
  agregarNuevoAlumno(datos:AlumnosUTL){
    return this.http.post('http://127.0.0.1:5000/api/alumnos',datos)
  }
}
 