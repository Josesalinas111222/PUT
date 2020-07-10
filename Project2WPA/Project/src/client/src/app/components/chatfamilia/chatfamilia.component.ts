import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';

@Component({
  selector: 'app-chatfamilia',
  templateUrl: './chatfamilia.component.html',
  styleUrls: ['./chatfamilia.component.css']
})
export class ChatfamiliaComponent implements OnInit {

  
  fechas = new Date();  
  ob_Fecha ={Fecha:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}
  
  
  EnviarMensaje=[]
  CargarMensaje=[]
  Mensaje:string='';
  Sujeto:string='Familia';

  constructor(private taskService: TaskService,private router: Router,){}

  ngOnInit(){
    this.taskService.GetMessage().subscribe(CargarMensaje=>{this.CargarMensaje = CargarMensaje
      console.log(this.CargarMensaje); 
    }) 
  }

  SendMessage(){
    var cFiltro = {
      Mensaje: this.Mensaje,    
      Sujeto: this.Sujeto,  
   }     
   this.EnviarMensaje.push(cFiltro);

   this.taskService.SendMessage(cFiltro).subscribe(EnviarMensaje=>{this.EnviarMensaje = EnviarMensaje 
  })       
   this.limpiar()
   this.ngOnInit()
 }

 
 limpiar(){
  this.Mensaje='';  
}

}
