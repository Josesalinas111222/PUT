import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';

@Component({
  selector: 'app-crear-calendario',
  templateUrl: './crear-calendario.component.html',
  styleUrls: ['./crear-calendario.component.css']
})
export class CrearCalendarioComponent implements OnInit {

  fechas = new Date();  
  ob_Fecha ={Fecha:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}

  infoUser:{name:string};
  Anuncios=[]
  Titulo:string='';
  Cuerpo1:string='';
  Cuerpo2:string='';
  FechaEvento:string='';
  Salida:string='';
  RutaImagen:string='';

  constructor(private taskService: TaskService,private router: Router,){}

  ngOnInit(): void {
  }

  AddAnuncio(){
    var cFiltro = {
      Titulo: this.Titulo,
      Cuerpo1: this.Cuerpo1,
      Cuerpo2: this.Cuerpo2,
      FechaEvento: this.FechaEvento,
      Salida: this.Salida,
      RutaImagen:this.RutaImagen,
   }     
   this.Anuncios.push(cFiltro);

   this.taskService.AddAnuncio(cFiltro).subscribe(Anuncios=>{this.Anuncios = Anuncios 
  })       
   this.limpiar()
 }

 limpiar(){
      this.Titulo='';
      this.Cuerpo2='';
      this.FechaEvento='';
      this.Salida='';
      this.RutaImagen='';
      this.Cuerpo1='';
}

}
