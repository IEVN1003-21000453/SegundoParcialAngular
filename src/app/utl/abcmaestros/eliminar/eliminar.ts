
import { MaestrosUTL } from '../maestrosUTL';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../maestrosapi.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-eliminar-maestro',
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {

  formulario!: FormGroup;
  idmaestro: string = '';

  regMaestro: MaestrosUTL = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    public maestrosUTL: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {

    this.formulario = this.fb.group({
      idmaestro: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    this.idmaestro =
      this.route.snapshot.paramMap.get('idmaestro') || '';

    this.maestrosUTL.getMaestro(this.idmaestro).subscribe({
      next: (response: MaestrosUTL) => {
        this.regMaestro = response;
        this.formulario.patchValue(response);
      },
      error: (error) => {
        console.error('Error al consultar el maestro:', error);
        alert('No se pudo consultar la información del maestro');
      }
    });

  }

  eliminarMaestro(): void {

    if (!confirm('¿Estás seguro de eliminar este maestro?')) {
      return;
    }

    this.maestrosUTL.EliminaMaestro(parseInt(this.idmaestro)).subscribe({

      next: (response) => {

        if (response.exito) {
          alert('Maestro eliminado correctamente');
          this.router.navigate(['/utl/listamaestros']);
        } else {
          alert(response.mensaje || 'No se pudo eliminar el maestro');
        }

      },

      error: (error) => {
        console.error('Error al eliminar el maestro:', error);

        const mensaje =
          error.error?.mensaje ||
          'Ocurrió un error al eliminar el maestro';

        alert(mensaje);
      }

    });

  }

}
