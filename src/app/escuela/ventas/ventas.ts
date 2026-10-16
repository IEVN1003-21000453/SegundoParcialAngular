
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Venta } from '../venta';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ventas.html'
})
export class Ventas implements OnInit {

  formulario!: FormGroup;
  ventas: Venta[] = [];
  indiceEdicion: number = -1;

  nuevaVenta: Venta = {
    nombre: '',
    cantidadPersonas: null,
    boletos: null,
    tarjeta: '',
    descuento: null,
    total: null
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadPersonas: new FormControl(''),
      boletos: new FormControl(''),
      tarjeta: new FormControl(''),
      descuento: new FormControl(''),
      total: new FormControl('')
    });

    this.formulario.valueChanges.subscribe(() => {
      this.calcularVenta();
    });

    this.cargarVentas();
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventas');

    if (datos) {
      this.ventas = JSON.parse(datos);
    } else {
      this.ventas = [];
    }
  }

  agregarVenta(): void {
    this.calcularVenta();

    this.nuevaVenta = {
      nombre: this.formulario.value.nombre || '',
      cantidadPersonas: Number(this.formulario.value.cantidadPersonas),
      boletos: Number(this.formulario.value.boletos),
      tarjeta: this.formulario.value.tarjeta,
      descuento: Number(this.formulario.value.descuento),
      total: Number(this.formulario.value.total)
    };

    if (
      this.nuevaVenta.nombre.trim() === '' ||
      this.nuevaVenta.cantidadPersonas < 1 ||
      this.nuevaVenta.boletos < 1 ||
      this.nuevaVenta.boletos > this.nuevaVenta.cantidadPersonas * 7
    ) {
      alert('Verifica el nombre, la cantidad de personas y los boletos');
      return;
    }

    if (this.indiceEdicion === -1) {
      this.ventas.push(this.nuevaVenta);
    } else {
      this.ventas[this.indiceEdicion] = this.nuevaVenta;
    }

    localStorage.setItem('ventas', JSON.stringify(this.ventas));

    this.limpiarCampos();
  }

  editarVenta(index: number): void {
    this.indiceEdicion = index;

    const venta = this.ventas[index];

    this.formulario.patchValue({
      nombre: venta.nombre,
      cantidadPersonas: venta.cantidadPersonas,
      boletos: venta.boletos,
      tarjeta: venta.tarjeta,
      descuento: venta.descuento,
      total: venta.total
    });
  }

  calcularVenta(): void {
    const cantidadPersonas = Number(this.formulario.value.cantidadPersonas);
    const boletos = Number(this.formulario.value.boletos);
    const tarjeta = this.formulario.value.tarjeta;

    let precioBase = boletos * 12;
    let precio = precioBase;

    if (
      this.formulario.value.cantidadPersonas === '' ||
      this.formulario.value.boletos === '' ||
      cantidadPersonas < 1 ||
      boletos < 1 ||
      boletos > cantidadPersonas * 7
    ) {
      precioBase = 0;
      precio = 0;
    } else {
      if (boletos > 5) {
        precio = precio * 0.85;
      } else if (boletos >= 3) {
        precio = precio * 0.90;
      }

      if (tarjeta === 'si') {
        precio = precio * 0.90;
      }
    }

    const descuento = parseInt(((precioBase - precio) * 100).toString()) / 100;
    const total = parseInt((precio * 100).toString()) / 100;

    if (this.formulario.value.descuento !== descuento) {
      this.formulario.controls['descuento'].setValue(descuento, {
        onlySelf: true,
        emitModelToViewChange: true
      });
    }

    if (this.formulario.value.total !== total) {
      this.formulario.controls['total'].setValue(total, {
        onlySelf: true,
        emitModelToViewChange: true
      });
    }
  }

  eliminarVenta(index: number): void {
    this.ventas.splice(index, 1);

    localStorage.setItem('ventas', JSON.stringify(this.ventas));

    if (this.indiceEdicion === index) {
      this.limpiarCampos();
    } else if (this.indiceEdicion > index) {
      this.indiceEdicion--;
    }
  }

  limpiarCampos(): void {
    this.indiceEdicion = -1;

    this.formulario.reset({
      nombre: '',
      cantidadPersonas: '',
      boletos: '',
      tarjeta: '',
      descuento: '',
      total: ''
    });
  }
}
