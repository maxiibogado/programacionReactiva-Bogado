import { Component, OnDestroy, OnInit } from '@angular/core';
import { Persona, PersonaServiceService } from '../persona-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit,OnDestroy {
  
  arrPersonas?:Persona[];
  personaSubscription: Subscription = new Subscription();

  constructor(private personasService:PersonaServiceService){}

  ngOnInit(): void {
    this.personaSubscription = this.personasService.getPersonas$()
      .subscribe(personas=>{
        this.arrPersonas = personas;
      })
  }

  ngOnDestroy(): void {
    this.personaSubscription.unsubscribe();
  }


}
