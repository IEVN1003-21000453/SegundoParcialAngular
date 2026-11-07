
import { MaestrosUTL } from '../maestrosUTL';
import { MaestroFilterPipe } from '../maestros-filter.pipe';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProyectoapiService } from '../maestrosapi.service';

@Component({
  standalone: true,
  imports: [FormsModule, MaestroFilterPipe, CommonModule, RouterLink],
  selector: 'app-maestros',
  templateUrl: './maestros.html',
})
export class Maestros implements OnInit {

  listfilter: string = '';
  maestroTitle: string = '';
  dataSource: MaestrosUTL[] = [];

  constructor(public maestrosUTL: ProyectoapiService) { }

  maestrosIric: MaestrosUTL[] = [
    {
      idmaestro: 1234,
      nombre: 'Fernando',
      apaterno: 'Medina',
      amaterno: 'Gutierrez',
      correo: 'fernando@gmail.com',
    }
  ];

  ngOnInit(): void {
    this.dataSource = this.maestrosIric;
    this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.maestrosUTL.getMaestros().subscribe({
      next: (response: MaestrosUTL[]) => {
        console.log('Datos recibidos del API:', response);

        if (Array.isArray(response)) {
          this.dataSource = response;
        }
      },
      error: (error) => {
        console.error('Error al consultar la API:', error);
      },
      complete: () => {
        console.log('Carga de maestros finalizada');
      }
    });
  }
}
