import { AlumnosUTL } from '../alumnosUTL';
import { AlumnoFilterPipe } from '../alumnos-filter.pipe';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProyectoapiService } from '../alumnosapi.service';

@Component({
  imports: [FormsModule, RouterLink, AlumnoFilterPipe, CommonModule],
  selector: 'app-alumnos',
  templateUrl: './alumnos.html',
})
export class Alumnos implements OnInit {
  listfilter: string = '';
  alumnoTitle: string = '';

  alumnosIric: AlumnosUTL[] = [
    {
      matricula: 1234,
      nombre: 'Emiliano',
      apaterno: 'Rodriguez',
      amaterno: 'Medina',
      correo: 'emiliano@gmail.com',
    }
  ];

  dataSource: AlumnosUTL[] = this.alumnosIric;

  constructor(public alumnosUTL: ProyectoapiService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cargarAlumnos();
    });
  }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosUTL.getAlumnos().subscribe({
      next: (response: any) => {
        const lista = Array.isArray(response) ? response : response.alumnos || response.data || [];
        this.dataSource = lista.length > 0 ? lista : this.alumnosIric;
        this.alumnosIric = this.dataSource;
      },
      error: (error) => {
        console.error('Error al consultar la API:', error);
      }
    });
  }
}