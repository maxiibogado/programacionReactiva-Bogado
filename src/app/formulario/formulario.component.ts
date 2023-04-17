import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonaServiceService } from '../persona-service.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit,OnDestroy {
  formulario:FormGroup;
  mensajePromesa$ : Promise<string> = this.personasService.miPromesa();  
  mensajeObservable$ : Observable<string> = this.personasService.miObservable();
  mensajeObservableSubscription$: Subscription = new Subscription();


  


  constructor(
    private personasService:PersonaServiceService
  ){
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl('')
    });
  }
  ngOnInit(): void {
      this.mensajePromesa$.catch(valor => {
        alert(valor);
      })
     this.mensajeObservableSubscription$ = this.mensajeObservable$
       .subscribe(
        valor => console.log(valor),
         error => console.log(error)
       )
    }
  

  onSubmit(){
    this.personasService.agregarPersona(this.formulario.value);
  }

  ngOnDestroy(): void {
    this.mensajeObservableSubscription$.unsubscribe();
  }

}
