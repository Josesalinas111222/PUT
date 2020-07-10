import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule }    from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import {DatosUsuario,secionToken,infoUser} from '../modelos';
import{SharedService} from '../Shared/shared.service';

////Importamos el modulo o clase para las rutas 
import{Router} from '@angular/router';


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
}) 

export class SingInComponent implements OnInit {
  
  DatosUsuario: DatosUsuario[];
  usuario:string;
  password:string;
  secionToken:secionToken[];
  msg=[];
  hideDatos:boolean=true;
  fechas = new Date(); 

  constructor(private SharedService: SharedService,
              private router: Router,
              private toastr: ToastrService){}

  ngOnInit() {
    localStorage.removeItem('Usuario');
    localStorage.removeItem('InfoUser');
    this.fechas.setDate(this.fechas.getDate());
  }


  InicioSecion(){
     var Datos = {
       username : this.usuario,
       password: this.password};
       this.msg=[];
      
     this.DatosUsuario=[];
     this.DatosUsuario.push(Datos);    
     
     this.SharedService.AuthenUser(this.DatosUsuario)
        .subscribe(secionToken=>{
             this.secionToken = secionToken

             console.log(this.secionToken)
            
             //Limpiamos la Varibles de Local Storage
             localStorage.removeItem('Usuario');
             localStorage.removeItem('InfoUser');
             localStorage.removeItem('Role');

              ////llama al servicio que autentifica al usuario 
             this.SharedService.usuarioEstaAutenticado(this.secionToken)
             this.msg.push(this.secionToken);
             
             for(let i=0;i<this.msg.length;i++){
               if(this.msg[i].success==false){
                  this.hideDatos=false;                  
               }
             }
             
             if(localStorage.getItem('Usuario')=='Autenticado'){                               
              this.router.navigate(['/cursos-actuales'])
             }
                   
        }) ;
        
       
  }

  OcultaMsg(){
    this.msg=[];
    this.hideDatos=true; 
  }


}

