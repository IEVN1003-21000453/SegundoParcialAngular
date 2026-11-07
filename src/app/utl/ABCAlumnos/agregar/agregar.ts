import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AlumnosUTL } from '../alumnosUTL';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../alumnosapi.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-agregar',
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {
  formGroup!: FormGroup;

  regAlumno: AlumnosUTL = {
    matricula: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private fb: FormBuilder,
    public alumnosutl: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      console.log('El formulario contiene datos inválidos');
      return;
    }

    const datos: AlumnosUTL = this.formGroup.getRawValue();

    console.log('Datos que se enviarán:', datos);

    this.alumnosutl.agregarNuevoAlumno(datos).subscribe({
      next: (respuesta) => {
        console.log('Respuesta de Flask:', respuesta);
        alert('Alumno agregado con éxito a la base de datos');

        this.formGroup.reset();

        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al registrar alumno:', error);

        const mensaje =
          error.error?.mensaje ||
          error.error?.error ||
          error.message ||
          'Ocurrió un error al registrar el alumno';

        alert(mensaje);
      }
    });
  }
}