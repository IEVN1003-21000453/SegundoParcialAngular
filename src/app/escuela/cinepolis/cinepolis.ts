
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css'
})
export class Cinepolis {
  formulario = new FormGroup({
    nombre: new FormControl(''),
    cantidadPersonas: new FormControl(),
    boletos: new FormControl(),
    tarjeta: new FormControl('')
  });

  total: number = 0;
  mensaje: string = '';
  descuento: number = 0;

  calcular(): void {
    const nombre = this.formulario.value.nombre || '';
    const cantidadPersonas = Number(this.formulario.value.cantidadPersonas);
    const boletos = Number(this.formulario.value.boletos);
    const tarjeta = this.formulario.value.tarjeta;

    if (
      nombre.trim() === '' ||
      cantidadPersonas < 1 ||
      boletos < 1
    ) {
      this.mensaje = 'Completa todos los campos correctamente';
      this.total = 0;
      this.descuento = 0;
      return;
    }

    if (boletos > cantidadPersonas * 7) {
      this.mensaje = 'No puedes comprar más de 7 boletos por persona';
      this.total = 0;
      this.descuento = 0;
      return;
    }

    const precioBase = boletos * 12;
    let precio = precioBase;

    if (boletos > 5) {
      precio *= 0.85;
    } else if (boletos >= 3) {
      precio *= 0.90;
    }

    if (tarjeta === 'si') {
      precio *= 0.90;
    }

    this.total = precio;
    this.descuento = precioBase - this.total;
    this.mensaje = `El cliente ${nombre} debe pagar: $${this.total.toFixed(2)}`;
  }

  salir(): void {
    this.formulario.reset({
      nombre: '',
      cantidadPersonas: 1,
      boletos: 1,
      tarjeta: 'no'
    });

    this.total = 0;
    this.descuento = 0;
    this.mensaje = '';
  }
}
