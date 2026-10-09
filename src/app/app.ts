import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
//import { Zodiaco } from './formulario/zodiaco/zodiaco';
import { Navbar } from './navbar/navbar';
//import { Distancia } from './formulario/distancia/distancia'

@Component({
  imports: [RouterOutlet, Navbar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}
