
import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';

@Component({
  selector: 'app-revisionclases',
  templateUrl: './revisionclases.component.html',
  styleUrls: ['./revisionclases.component.css']
})
export class RevisionclasesComponent implements OnInit {

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
  ActividadFiltro=[]

  constructor(private taskService: TaskService,private router: Router,){}
 

  ngOnInit(): void {
    this.taskService.getCursosActuales().subscribe(CursosActuales=>{this.CursosActuales = CursosActuales
      console.log(this.CursosActuales); 
      this.infoUser = JSON.parse(localStorage.getItem('InfoUser'));
      this.fechas.setDate(this.fechas.getDate());   
      //this.ngOnInit2()
    })    
  }

  MostrarMateriaFiltro(id) { 
    this.taskService.getActividadesCursosFiltros(id).subscribe(ActividadFiltro=>{this.ActividadFiltro = ActividadFiltro
      console.log(this.ActividadFiltro); 
    })  
}

}
