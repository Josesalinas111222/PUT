import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {

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
  ListaAlumnos=[]

  constructor(private taskService: TaskService,private router: Router,){}
  

  ngOnInit() { 
    this.taskService.getListaAlumnosXclase().subscribe(ListaAlumnos=>{this.ListaAlumnos = ListaAlumnos
    console.log(this.ListaAlumnos); 
    this.infoUser = JSON.parse(localStorage.getItem('InfoUser'));
    this.fechas.setDate(this.fechas.getDate());    
  }) 
  }


  MostrarMateriaFiltro(id) { 
    this.taskService.getActividadesCursosFiltros(id).subscribe(ActividadFiltro=>{this.ActividadFiltro = ActividadFiltro
      console.log(this.ActividadFiltro); 
    })  
}

MostrarListadeEstudiantesXclase() { 
    this.taskService.getCursosActuales().subscribe(CursosActuales=>{this.CursosActuales = CursosActuales
    console.log(this.CursosActuales);
  })  
}

VerClasesParaRevision() { 
  this.router.navigate(['/revision/clases'])
}

}
