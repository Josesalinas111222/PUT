import { Component, OnInit } from '@angular/core';
import { infoUser } from '../user/modelos';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';


import{TaskService} from '../../services/task.service';

import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;

type AOA = any[][];

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {
  Calificaciones=[]
  CalificacionesFiltro=[]
  Tasks: Task[]; 

constructor(private taskService: TaskService,private router: Router,){

  }
  

  ngOnInit() { 
    this.taskService.getCalificaciones().subscribe(Calificaciones=>{this.Calificaciones = Calificaciones 
    console.log(this.Calificaciones); 
  }) 
  } 

  MostrarCalificacionesFiltro(id) { 
    this.taskService.getActividadesMateriaFiltros(id).subscribe(CalificacionesFiltro=>{this.CalificacionesFiltro = CalificacionesFiltro 
      console.log(this.CalificacionesFiltro); 
    })  
}
  
}
