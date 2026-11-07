
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaestrosUTL } from '../maestrosUTL';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../maestrosapi.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-agregar-maestro',
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {

  formGroup!: FormGroup;

  regMaestro: MaestrosUTL = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private fb: FormBuilder,
    public maestrosutl: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const datos: MaestrosUTL = {
      idmaestro: 0,
      ...this.formGroup.getRawValue()
    };

    console.log('Datos que se enviarán:', datos);

    this.maestrosutl.agregarNuevoMaestro(datos).subscribe({
      next: (respuesta) => {
        console.log('Respuesta de Flask:', respuesta);

        alert('Maestro registrado correctamente');

        this.formGroup.reset();

        this.router.navigate(['/utl/listamaestros']);
      },
      error: (error) => {
        console.error('Error al registrar maestro:', error);

        const mensaje =
          error.error?.mensaje ||
          error.error?.error ||
          error.message ||
          'Ocurrió un error al registrar el maestro';

        alert(mensaje);
      }
    });

  }

}
