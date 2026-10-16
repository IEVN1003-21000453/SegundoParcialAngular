
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Venta } from '../venta';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './cinepolis.html'
})
export class Cinepolis {

  formulario = new FormGroup({
    nombre: new FormControl(''),
    cantidadPersonas: new FormControl(),
    boletos: new FormControl(),
    tarjeta: new FormControl('n')
  });

  mensaje: string = '';
  descuento: number = 0;
  total: number = 0;
  ventas: Venta[] = [];

  constructor() {
    this.cargarVentas();
  }

  calcular(): void {
    const nombre = this.formulario.value.nombre || '';
    const cantidadPersonas = Number(this.formulario.value.cantidadPersonas);
    const boletos = Number(this.formulario.value.boletos);
    const tarjeta = this.formulario.value.tarjeta || 'no';

    if (
      nombre.trim() === '' ||
      cantidadPersonas < 1 ||
      boletos < 1 ||
      !Number.isInteger(cantidadPersonas) ||
      !Number.isInteger(boletos)
    ) {
      this.mensaje = 'Completa todos los campos correctamente.';
      this.total = 0;
      this.descuento = 0;
      return;
    }

    if (boletos > cantidadPersonas * 7) {
      this.mensaje = 'No puedes comprar más de 7 boletos por persona.';
      this.total = 0;
      this.descuento = 0;
      return;
    }

    const precioBase = boletos * 12;
    let precio = precioBase;

    if (boletos > 5) {
      precio = precio * 0.85;
    } else if (boletos >= 3) {
      precio = precio * 0.90;
    }

    if (tarjeta === 'si') {
      precio = precio * 0.90;
    }

    this.total = precio;
    this.descuento = precioBase - precio;

    const nuevaVenta: Venta = {
      nombre: nombre,
      cantidadPersonas: cantidadPersonas,
      boletos: boletos,
      tarjeta: tarjeta,
      descuento: this.descuento,
      total: this.total
    };

    this.ventas.push(nuevaVenta);

    localStorage.setItem(
      'ventas',
      JSON.stringify(this.ventas)
    );

    this.mensaje =
      'Venta registrada correctamente. Total a pagar: $' +
      this.total.toFixed(2);
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventas');

    if (datos) {
      this.ventas = JSON.parse(datos);
    } else {
      this.ventas = [];
    }
  }

  salir(): void {
    this.formulario.reset({
      nombre: '',
      cantidadPersonas: 1,
      boletos: 1,
      tarjeta: 'no'
    });

    this.mensaje = '';
    this.total = 0;
    this.descuento = 0;
  }

}
