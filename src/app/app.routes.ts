
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'utl',
    children: [
      {
        path: 'alumnos',
        loadComponent: () =>
          import('./utl/ABCAlumnos/alumnos/alumnos').then(
            (c) => c.Alumnos
          ),
      },
      {
        path: 'maestros',
        loadComponent: () =>
          import('./utl/abcmaestros/maestros/maestros').then(
            (c) => c.Maestros
          ),
      },
    ],
  },
  {
    path: 'formulario',
    children: [
      {
        path: 'distancia',
        loadComponent: () =>
          import('./formulario/distancia/distancia').then(
            (c) => c.Distancia
          ),
      },
      {
        path: 'zodiaco',
        loadComponent: () =>
          import('./formulario/zodiaco/zodiaco').then(
            (c) => c.Zodiaco
          ),
      },
    ],
  },
  {
    path: 'escuela',
    children: [
      {
        path: 'lista-escuela',
        loadComponent: () =>
          import('./escuela/lista-escuela/lista-escuela').then(
            (c) => c.ListaEscuela
          ),
      },
      {
        path: 'cinepolis',
        loadComponent: () =>
          import('./escuela/cinepolis/cinepolis').then(
            (c) => c.Cinepolis
          ),
      },
      {
        path: 'ventas',
        loadComponent: () =>
          import('./escuela/ventas/ventas').then(
            (c) => c.Ventas
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'escuela/cinepolis',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'escuela/cinepolis'
  },
];
