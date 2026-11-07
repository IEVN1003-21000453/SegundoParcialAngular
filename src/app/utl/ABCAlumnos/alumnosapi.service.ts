import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlumnosUTL } from "./alumnosUTL";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {
  private baseUrl = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) { }

  public getAlumnos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/alumnos`);
  }

  public getAlumno(mat: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/alumnos/${mat}`);
  }

  public agregarNuevoAlumno(datos: AlumnosUTL): Observable<any> {
    return this.http.post(`${this.baseUrl}/alumnos`, datos, { responseType: 'text' as 'json' });
  }

  public modificarAlumno(mat: number, datos: AlumnosUTL): Observable<any> {
    return this.http.put(`${this.baseUrl}/alumnos/${mat}`, datos, { responseType: 'text' as 'json' });
  }

  public EliminaAlumno(mat: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/alumnos/${mat}`, { responseType: 'text' as 'json' });
  }
}