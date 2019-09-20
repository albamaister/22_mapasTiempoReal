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
  infoWindows: google.maps.InfoWindow[] = [];

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

    const contenido = `<b>${ marcador.nombre }</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });

    this.infoWindows.push(infoWindow);

    google.maps.event.addDomListener(marker, 'click', () => {
      this.infoWindows.forEach( infWin => infWin.close());
      infoWindow.open(this.map, marker);

  });

    google.maps.event.addDomListener(marker, 'dblclick', (coors) => {

        marker.setMap(null);
        // Disparar un evento de socket, para borrar el marcador
    });

    google.maps.event.addDomListener(marker, 'drag', (coors) => {
      const nuevoMarcador = {
        lat: coors['latLng'].lat(),
        lng: coors['latLng'].lng(),
        nombre: marcador.nombre
      };

      console.log(nuevoMarcador);
      // Disparar un evento de socket, para mover el marcador
  });
  }

}
