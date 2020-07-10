import { Component, OnInit,ViewChild } from '@angular/core';
import { infoUser } from '../user/modelos';

//fiesta
import { MatPaginator,MatSort,MatTableDataSource } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import { DatosM } from '../../Task';

//Importamos  la  clase TaskService de  [/services/task.service.ts] 
import{TaskService} from '../../services/task.service';

//Importamos la Clase Toastr de mensajeria
import { ToastrService } from 'ngx-toastr';

//Libreria para las alerta sweetAlert
//import * as _swal from 'sweetalert';
//import { SweetAlert } from 'sweetalert/typings/core';
//import { query } from '@angular/core/src/render3/query';
//SeewtAlert
//const swal: SweetAlert = _swal as any;
//const swal = require('sweetalert2')

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  //fiesta
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  displayedColumns=[];
  Elemento=[];
  Datos=[];
  Datos2=[];
  Invitados:number;
  Confirmados:number;


   fechas = new Date(); 
   infoUser:{name:string}
   cMes:number=0;

   ////Configuracion Toggles-Slide
   Label1 ='';  
   color = 'accent';
   checked = false;
   disabled = false;
   Status:boolean;
   ActivoReporte=[];
   ValorActivacion=[];
   

  constructor(private taskService: TaskService,
              private toastr: ToastrService){}

  ngOnInit(){ 
     this.infoUser = JSON.parse(localStorage.getItem('InfoUser'));
     this.fechas.setDate(this.fechas.getDate()); 
     
     ////Servicio de Activador de Reportes
     this.taskService.getActivarreport().subscribe(ActivoReporte=>{this.ActivoReporte= ActivoReporte
         this.Status=this.ActivoReporte[0].Activo  
         if(this.Status==false){this.Label1="Reportes Desactivados..."
         }else{ this.Label1="Reportes  Activados..."}  
     })
     //fiesta
     this.DatosAsistencia();      
  }  
  

  //fiesta
  DatosAsistencia(){       
    this.taskService.getAsistenciaFiesta().subscribe(Datos=>{this.Datos = Datos        
      this.displayedColumns = ['EmpleadoGeneral','NombreCompleto','NombreSucursal'];
      this.dataSource = new MatTableDataSource(this.Datos);   
      this.dataSource.paginator = this.paginator;           
      this.dataSource.sort = this.sort;
      this.Invitados = this.Datos.length;
      //Asistencias Actualizadas
      this.taskService.getAsistenciaFiestaAct().subscribe(Datos2=>{this.Datos2 = Datos2    
          this.Confirmados = this.Datos2.length;
      })
    })     
  } 
 applyFilter(filterValue: string){ 
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
  ConfirmarAsistencia(Empleado){    
    var Filtro = {
      EmpleadoGeneral :Empleado
    }
    this.taskService.getAsistenciaconfirmada(Filtro).subscribe(Elemento=>{this.Elemento=Elemento         
        console.log(this.Elemento);
        if(this.Elemento[0] = true){
            //swal("!!!!Felicidades!!!! ","Asistencia Confirmada Exitosamente...", "success")    
            alert("Asistencia Confirmada Exitosamente...")    
            this.taskService.getAsistenciaFiestaAct().subscribe(Datos2=>{this.Datos2 = Datos2    
              this.Confirmados = this.Datos2.length;
              location.reload();
              this.ngOnInit();
            })
        }else{
          //swal('Error',"Tiene problemas para confirmar asistencia!!!","warning")
          alert("Tiene problemas para confirmar asistencia!!!")
        }
    })
  }
  
 

  
  AvisoBienvenida(){
   this.toastr.success('Bienvenidos a Web','Hola') 
  }

  ActivarReportes(){     
    if(this.Status==true){
        //0
        this.Label1="Reportes Desactivados..."
        this.ValorActivacion=[];
        this.ActivoReporte=[];
        this.ValorActivacion.push('0');
        this.taskService.getActivarreportA(this.ValorActivacion).subscribe(ActivoReporte=>{this.ActivoReporte=ActivoReporte         
      })        
    }    
    if(this.Status==false ){
        //1
        this.Label1="Reportes Activados..."
        this.ValorActivacion=[];
        this.ActivoReporte=[];
        this.ValorActivacion.push('1')
        this.taskService.getActivarreportA(this.ValorActivacion).subscribe(ActivoReporte=>{this.ActivoReporte= ActivoReporte        
      })        
    }
  
  }


}
