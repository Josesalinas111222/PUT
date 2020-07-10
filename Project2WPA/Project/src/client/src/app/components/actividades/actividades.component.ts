import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  ActividadesAlumnos=[]
  ActividadesAlumnos2=[]
  Materias=[]
  Tasks: Task[]; 
  
  constructor(private taskService: TaskService,private router: Router,){

  }
    

  ngOnInit() { 
    this.taskService.getMaterias().subscribe(Materias=>{this.Materias = Materias
    console.log(this.Materias); 
    //this.verActividadesMateria()
  }) 
  }

  MostrarMateriaFiltro(id) { 
    this.taskService.getActividadesMateriaFiltros(id).subscribe(ActividadesAlumnos2=>{this.ActividadesAlumnos2 = ActividadesAlumnos2
      console.log(this.ActividadesAlumnos2); 
    })  
}

  verActividades(id: number){
    this.router.navigate(['/Ver-actividad'])
  }
  
  verActividadesMateria(){
    this.taskService.getActividadesAlumnos().subscribe(ActividadesAlumnos=>{this.ActividadesAlumnos = ActividadesAlumnos
      console.log(this.ActividadesAlumnos); 
    })
  }

}
