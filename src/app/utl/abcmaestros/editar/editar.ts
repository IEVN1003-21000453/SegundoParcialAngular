
import { MaestrosUTL } from '../maestrosUTL';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../maestrosapi.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-editar-maestro',
  templateUrl: './editar.html',
})
export class Editar implements OnInit {

  formulario!: FormGroup;
  idmaestro: string = '';

  constructor(
    private route: ActivatedRoute,
    public maestrosUTL: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {

    this.formulario = this.fb.group({
      idmaestro: ['', Validators.required],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });

    this.idmaestro =
      this.route.snapshot.paramMap.get('idmaestro') || '';

    this.maestrosUTL.getMaestro(this.idmaestro).subscribe({
      next: (response: MaestrosUTL) => {
        console.log('Maestro recibido:', response);
        this.formulario.patchValue(response);
      },
      error: (error) => {
        console.error('Error al consultar el maestro:', error);
        alert('No se pudo consultar la información del maestro');
      }
    });

  }

  onSubmit(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const maestro: MaestrosUTL = this.formulario.getRawValue();

    this.maestrosUTL.modificarMaestro(parseInt(this.idmaestro), maestro).subscribe({

      next: (response) => {

        console.log('Respuesta del API:', response);

        if (response.exito) {
          alert('Maestro actualizado correctamente');
          this.router.navigate(['/utl/listamaestros']);
        } else {
          alert(response.mensaje || 'No se pudo actualizar el maestro');
        }

      },

      error: (error) => {
        console.error('Error al actualizar:', error);

        const mensaje =
          error.error?.mensaje ||
          'Ocurrió un error al actualizar el maestro';

        alert(mensaje);
      }

    });

  }

}
