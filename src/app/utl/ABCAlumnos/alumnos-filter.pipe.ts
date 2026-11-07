import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUTL } from './alumnosUTL';

@Pipe({
  name: 'alumnoFilter',
  standalone: true,
})
export class AlumnoFilterPipe implements PipeTransform {
  transform(value: AlumnosUTL[], args: string): AlumnosUTL[] {
    let filter:string=args?args.toLocaleLowerCase():'';
    return filter?value.filter((alumno:AlumnosUTL)=>alumno.nombre.toLocaleLowerCase().indexOf(filter)!==-1):value;
  }
}