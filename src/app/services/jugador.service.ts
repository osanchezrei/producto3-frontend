import { Jugador } from './../interfaces/Jugador';
import { Injectable } from '@angular/core';

import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { STRING_TYPE } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class JugadorService {

  private jugadoresCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.jugadoresCollection = collection(this.firestore, 'Jugadores');
  }
  //Obtener todos los jugadores
  getAll(): Observable<Jugador[]> {
    return collectionData(this.jugadoresCollection, {
      idField: 'id',
    }) as Observable<Jugador[]>;
  }
  //Obtener solo uno
  get(id: string) {
    const jugadoresDocumentReference = doc(this.firestore, `Jugadores/${id}`);
    return docData(jugadoresDocumentReference, { idField: 'id' });
  }

  //Metodo para crear un nuevo jugador en la DB
  add(jugador: Jugador) {
    return addDoc(this.jugadoresCollection, jugador);
  }

  //Borrar un Jugador de la DB
  delete(id: string | number | null | undefined) {
      const jugadoresDocumentReference = doc(this.firestore, `Jugadores/${id}`);
      return deleteDoc(jugadoresDocumentReference);
  }

  update(newJugadorData: Jugador, oldJugadorData: Jugador) {
    const jugadoresDocumentReference = doc(
      this.firestore,
      `Jugadores/${oldJugadorData.id}`
    );
    console.log(oldJugadorData.id);
    return updateDoc(jugadoresDocumentReference, { ...newJugadorData });
  }
}
