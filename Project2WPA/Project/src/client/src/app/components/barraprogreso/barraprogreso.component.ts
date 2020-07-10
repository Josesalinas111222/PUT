import { Component, OnInit,Input } from '@angular/core';   //Importamos input de @input  [es extra]

/**Importamos el modulo FormsModule */
import { FormsModule } from '@angular/forms';
import { NgModule }    from '@angular/core';

@Component({
  selector: 'app-barraprogreso',
  templateUrl: './barraprogreso.component.html'  
})

export class BarraProgresoComponent implements OnInit {
   
  ///declaramos una propiedad publica que la usamos en cualquier lugar
  @Input() public leyenda:string;  


  //Encapsulamos en una variable private el servicio que importamos del servicio TaskService @input
  constructor(){
     this.leyenda='';   //iniciamos el valor del al variable vacia  @input
  }
   

    ngOnInit(){}



}
