import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any) {
    const results = [];
    for(const jugador of value){
      if (jugador.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || jugador.posicion.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        results.push(jugador);
      }
    }
    return results;
  }
}
