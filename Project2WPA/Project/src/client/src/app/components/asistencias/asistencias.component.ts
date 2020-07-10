import { Component, OnInit } from '@angular/core';
import { infoUser } from '../user/modelos';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';

import{TaskService} from '../../services/task.service';

import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;

type AOA = any[][];
@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {
  Asistencias=[]
  Tasks: Task[]; 

  constructor(private taskService: TaskService,private router: Router,){

  }
  
  ngOnInit() { 
    this.taskService.getAsistencias().subscribe(Asistencias=>{this.Asistencias = Asistencias
    console.log(this.Asistencias); 
  }) 
  }


}
