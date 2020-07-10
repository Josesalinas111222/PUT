import { Component, OnInit } from '@angular/core';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';

import{TaskService} from '../../services/task.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  calendario=[]
  Tasks: Task[]; 
  constructor(private taskService: TaskService,private router: Router,){

  }
  
  ngOnInit() { 
    this.taskService.getCalendario().subscribe(calendario=>{this.calendario = calendario
    console.log(this.calendario); 
  }) 
  }

  

  CrearActividadCalendario(){
    this.router.navigate(['/crear-calendario'])
  }
  


}
