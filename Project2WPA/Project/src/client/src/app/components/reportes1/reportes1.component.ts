import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';


@Component({
  selector: 'app-reportes1',
  templateUrl: './reportes1.component.html',
  styleUrls: ['./reportes1.component.css']
})
export class Reportes1Component implements OnInit {





  fechas = new Date();  
  ob_Fecha ={Fecha:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}
  
  infoUser:{name:string};
  ActividadFiltro=[]
  Nivel1A=[]
  Nivel2A=[]
  Nivel3A=[]

  constructor(private taskService: TaskService,private router: Router,){}
   
  ngOnInit(){
    this.taskService.getCursosActuales().subscribe(ActividadFiltro=>{this.ActividadFiltro = ActividadFiltro
      console.log(this.ActividadFiltro); 
      this.infoUser = JSON.parse(localStorage.getItem('InfoUser'));
      this.fechas.setDate(this.fechas.getDate());   
    }) 
  }

  Nivel1(){
    this.taskService.getReporteNivel1().subscribe(Nivel1A=>{this.Nivel1A = Nivel1A
      console.log(this.Nivel1A); 
    })
  }

  Nivel2(){
    this.taskService.getReporteNivel2().subscribe(Nivel2A=>{this.Nivel2A = Nivel2A
      console.log(this.Nivel2A); 
    })
  }

  Nivel3(){
    this.taskService.getReporteNivel3().subscribe(Nivel3A=>{this.Nivel3A = Nivel3A
      console.log(this.Nivel3A); 
    })
  }

}
