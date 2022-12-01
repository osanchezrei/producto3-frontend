import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../../interfaces/Jugador';
import { JugadorService } from '../../services/jugador.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
})

export class JugadoresComponent implements OnInit{
  playerFilter = '';
  selectedJugador!: Jugador | undefined;
  jugadoresList$?: Observable<any[]>;

  newJugadorForm = this.formBuilder.nonNullable.group({
    nombre: '',
    descripcion: '',
    posicion: '',
    edad: 0,
    altura: 0,
    puntos: 0,
    media: '',
    img: ''
  });

  constructor(
      private readonly jugadoresService: JugadorService,
      private formBuilder: FormBuilder,
    ){}

  onSelect(jugador: Jugador){
    this.selectedJugador = jugador;
  }
  onDelete(jugador: Jugador){
    this.jugadoresService.delete(jugador.id);
    this.selectedJugador = undefined
  }
  onSubmit(): void{
    this.jugadoresService.add(this.newJugadorForm.value);
    this.newJugadorForm.reset();
  }

  ngOnInit(): void {
    this.jugadoresList$ = this.jugadoresService.getAll();
  }
}
