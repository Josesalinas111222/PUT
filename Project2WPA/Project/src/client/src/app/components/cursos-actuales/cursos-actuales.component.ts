import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task, Materias } from '../../Task';
import{Router} from '@angular/router';

@Component({
  selector: 'app-cursos-actuales',
  templateUrl: './cursos-actuales.component.html',
  styleUrls: ['./cursos-actuales.component.css']
})
export class CursosActualesComponent implements OnInit {
  
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

  public showFiltroMateria:boolean = false;
  public MostrarFiltroMateria:any  = 'Filtro Materia';

  public filesToUpload:File =  null; 

  constructor(private taskService: TaskService,private router: Router,){}
    

  MostrarMateriaFiltro(id) { 
      this.taskService.getActividadesCursosFiltros(id).subscribe(ActividadFiltro=>{this.ActividadFiltro = ActividadFiltro
        console.log(this.ActividadFiltro); 
      })  
  }

  
  ngOnInit() { 
    this.taskService.getCursosActuales().subscribe(CursosActuales=>{this.CursosActuales = CursosActuales
    console.log(this.CursosActuales); 
    this.infoUser = JSON.parse(localStorage.getItem('InfoUser'));
    this.fechas.setDate(this.fechas.getDate());   
    //this.ngOnInit2()
  }) 
  }

  ngOnInit2() { 
    this.taskService.getActividadesCursos().subscribe(Actividades=>{this.Actividades = Actividades
    console.log(this.Actividades); 
    })
  }

  verActividades(id: number){
    this.router.navigate(['/Ver-actividad'])
  }

  AddActividad(){
      var cFiltro = {
        Materia: this.Materia,
        Titulo:this.Titulo,
        Cuerpo1:this.Cuerpo1,        
        FechaVencimiento:this.FechaVencimiento,
        Puntaje:this.Puntaje,
     }     
     this.DatosActividad.push(cFiltro);

     this.taskService.AddActividad(cFiltro).subscribe(DatosActividad=>{this.DatosActividad = DatosActividad 
    })       
     this.limpiar()
     this.ngOnInit2()
   }





  fileChangeEvent(fileInput: any)    {
    this.filesToUpload = <File>fileInput.target.files[0];
} 

  limpiar(){
    this.Materia='';
    this.Titulo='';
    this.Cuerpo1='';
    this.FechaVencimiento=''; 
    this.Puntaje='';
  }


}