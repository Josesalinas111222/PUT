import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';

@Component({
  selector: 'app-revisionclasesactividades',
  templateUrl: './revisionclasesactividades.component.html',
  styleUrls: ['./revisionclasesactividades.component.css']
})
export class RevisionclasesactividadesComponent implements OnInit {

  URLactual = new String(window.location);
  index = (this.URLactual.lastIndexOf( "/" ))+1;
  index2 = this.URLactual.substring((this.URLactual.lastIndexOf( "/" ))+1);
  


  fechas = new Date();  
  ob_Fecha ={Fecha:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}

  infoUser:{name:string};
  CursosActuales=[]
  Actividades=[]
  Materias=[]
  Tasks: Task[]; 
  Materia:string='';
  Titulo:string='';
  Cuerpo1:string='';
  FechaVencimiento:string='';
  Puntaje:string='';
  DatosActividad=[];
  MateriaFiltro:string='';
  observaciones:string='';
  ActividadClase:string='';
  
  ActividadFiltroMateria=[]
  Evaluacion=[]


  constructor(private taskService: TaskService,private router: Router,){}
 

  ngOnInit(): void {
    console.log(this.URLactual);
    console.log(this.index);
    console.log(this.index2);
    this.MostrarMateriaRevision(this.index2)
  }

  MostrarMateriaRevision(id) { 
    this.taskService.getActividadesEvaluacion(id).subscribe(ActividadFiltroMateria=>{this.ActividadFiltroMateria = ActividadFiltroMateria
      console.log(this.ActividadFiltroMateria); 
    })  
}

ModActividad(){
  var cFiltro = {
    Puntaje: this.Puntaje,
    observaciones: this.observaciones,
    ActividadClase: this.index2,
 }     
 this.Evaluacion.push(cFiltro);

 this.taskService.ModActividad(cFiltro).subscribe(Evaluacion=>{this.Evaluacion = Evaluacion 
  })       
}

}
