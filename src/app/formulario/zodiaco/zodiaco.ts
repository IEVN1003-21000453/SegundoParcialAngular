import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class Zodiaco {
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  diaNacimiento: number = 0;
  mesNacimiento: number = 0;
  anioNacimiento: number = 0;
  sexo: string = '';
  edad: number = 0;
  signoZodiacal: string = '';
  imagenSigno: string = '';
  mostrarResultado: boolean = false;

  signos: string[] = [
    'rata', 'buey', 'tigre', 'conejo', 'dragon', 'serpiente',
    'caballo', 'cabra', 'mono', 'gallo', 'perro', 'cerdo'
  ];

  imagenes: { [key: string]: string } = {
    rata: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Rata.jpg',
    buey: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg',
    tigre: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Tigre.jpg',
    conejo: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Conejo.jpg',
    dragon: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Dragon.jpg',
    serpiente: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Serpiente.jpg',
    caballo: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg',
    cabra: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cabra.jpg',
    mono: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg',
    gallo: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Gallo.jpg',
    perro: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Perro.jpg',
    cerdo: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cerdo.jpg'
  };

  calcularEdad(): void {
    const fechaActual = new Date();
    let edadCalculada = fechaActual.getFullYear() - this.anioNacimiento;
    const mesActual = fechaActual.getMonth() + 1;
    const diaActual = fechaActual.getDate();

    if (mesActual < this.mesNacimiento || (mesActual === this.mesNacimiento && diaActual < this.diaNacimiento)) {
      edadCalculada--;
    }
    this.edad = edadCalculada;
  }

  obtenerSigno(): void {
    const indice = (this.anioNacimiento - 1900) % 12;
    const pos = indice < 0 ? indice + 12 : indice;
    this.signoZodiacal = this.signos[pos];
  }

  calcularZodiaco(): void {
    if (
      !this.nombre ||
      !this.apellidoPaterno ||
      !this.apellidoMaterno ||
      !this.diaNacimiento ||
      !this.mesNacimiento ||
      !this.anioNacimiento ||
      !this.sexo
    ) {
      return;
    }

    this.calcularEdad();
    this.obtenerSigno();
    this.imagenSigno = this.imagenes[this.signoZodiacal] || '';
    this.mostrarResultado = true;
  }
}
