import { AlumnosUTL } from '../alumnosUTL';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
 
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../alumnosapi.service';
import { ActivatedRoute } from '@angular/router';
 
 
@Component({
  imports: [ReactiveFormsModule,RouterLink],
  selector: 'app-eliminar',
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit  {
formulario!:FormGroup;
 matricula: string = '';
regAlumno: AlumnosUTL = {
  matricula: 0,
  nombre: '',
  apaterno: '',
  amaterno: '',
  correo: ''
};
 
  constructor(private route: ActivatedRoute,
     public alumnosUtl:ProyectoapiService,
    public fb:FormBuilder,   public router: Router
) {}
 
  ngOnInit(): void {
 
    this.formulario=this.fb.group({
      matricula: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    })
 
        this.matricula =
      this.route.snapshot.paramMap.get('matricula') || '';
 
    this.alumnosUtl.getAlumno(this.matricula).subscribe({
      next:(response)=>{
        //if (response.exito && response.AlumnosUtl){
          //this.formulario.patchValue(response.alumno)
          this.regAlumno=response.alumno
        //}
      },
      error: (error) => {
        console.error('Error al consultar el alumno:', error);
      }
 
 
    })
   
  }
 
}