import { AlumnosUTL } from '../alumnosUTL';
import { AlumnoFilterPipe } from '../alumnos-filter.pipe';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProyectoapiService } from '../alumnosapi.service';

@Component({
  standalone: true,
  imports: [FormsModule, AlumnoFilterPipe, CommonModule],
  selector: 'app-alumnos',
  templateUrl: './alumnos.html',
})
export class Alumnos implements OnInit {

  listfilter: string = '';
  alumnoTitle: string = '';
  dataSource: AlumnosUTL[] = [];

  constructor(public alumnosUTL: ProyectoapiService) { }

  alumnosIric: AlumnosUTL[] = [
    {
      matricula: 21000453,
      nombre: 'emiliano',
      apaterno: 'rodriguez',
      amaterno: 'medina',
      correo: 'emiliano@gmail.com',
    }
  ];

  ngOnInit(): void {
    this.dataSource = this.alumnosIric;
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosUTL.getAlumnos().subscribe({
      next: (response: AlumnosUTL[]) => {
        console.log('Datos recibidos del API:', response);

        if (Array.isArray(response)) {
          this.dataSource = response;
        }
      },
      error: (error) => {
        console.error('Error al consultar la API:', error);
      },
      complete: () => {
        console.log('Carga de alumnos finalizada');
      }
    });
  }
}