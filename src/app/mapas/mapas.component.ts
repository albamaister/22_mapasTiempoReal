import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Lugar } from '../interfaces/lugar';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: google.maps.Map;

  marcadores: google.maps.Marker[] = [];

  lugares: Lugar[] = [
    {
      nombre: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
      nombre: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
      nombre: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
  ];

  constructor() { }

  ngOnInit() {

    this.cargarMapa();
  }

  cargarMapa() {
    const latLong = new google.maps.LatLng(37.784679, -122.395936);

    const mapaOpciones: google.maps.MapOptions = {

      center: latLong,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    this.map = new google.maps.Map( this.mapElement.nativeElement, mapaOpciones );

    for (const lugar of this.lugares) {
      this.agregarMarcador(lugar);
    }
  }

  agregarMarcador( marcador: Lugar ) {
    const latLong = new google.maps.LatLng(marcador.lat, marcador.lng);

    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLong,
      draggable: true
    });

    this.marcadores.push(marker);
  }

}
