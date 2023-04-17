import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

 export interface Persona{
  nombre:string,
  apellido:string
}


@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

 private personas:Persona[];

 private personas$:Subject<Persona[]>;

  constructor() {
    this.personas = [];
    this.personas$ = new Subject();
   }

   

   agregarPersona(persona:Persona){
    this.personas.push(persona);
    this.personas$.next(this.personas); // Se indica a todos los componentes que se hayan inscripto al observable
                                        // que el array ha sufrido cambios, por lo tanto, se envia de nuevo el array.
                                        // con el next se emite y se pasa el nuevo array actualizado a todos los suscriptos.
  }

  getPersonas$():Observable<Persona[]>{
    return this.personas$.asObservable(); // se transforma en un observable para que luego para el exterior se puedan
                                          // suscbribir a el y se puedan recuperar los datos.
  }

  miPromesa(): Promise<string> {
    return new Promise((resolve,reject) => {
      let seCumplePromesa = false;
      setTimeout(() => {
        return  seCumplePromesa ? resolve('¡Se cumplió la promesa!'): reject( 'Lo siento, no se cumplió la promesa');
      }, 2000);
    }
  );
  }

  miObservable(): Observable<string> {
    return new Observable(observer => {
      let seCumpleObservable = false;
      setTimeout(() => {
        if (seCumpleObservable) {
          observer.next('¡Se cumplió el observable!')
          observer.complete(); 
        } else {
          observer.error('Lo siento, no se cumplió el observable');
        }
      }, 2000);
    }
  );
  }



}
