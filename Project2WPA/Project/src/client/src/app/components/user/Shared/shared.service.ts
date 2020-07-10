import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable } from 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomainService} from '../../../domain/domain.service'

////Importamos el modulo o clase para las rutas 
import{Router} from '@angular/router';


@Injectable()
export class SharedService {

  constructor(private http:HttpClient,
              private router: Router,
              private DomainService:DomainService){}

  //domain:string    = "http://201.220.141.14:3001";     ///Para uso en linea 
  domain:string    = this.DomainService.RutaDomain();



  AuthenUser(DatosUsuario): Observable<any>{    
      let _params = DatosUsuario;
      let headers = new HttpHeaders().set('Content-type','application/json')
      return this.http.post(`${this.domain}/api/autentificacion/`,_params,{headers: headers});        
  }

  ////servicio que autentifica al usuario para el guard
  usuarioEstaAutenticado(secionToken){
       if(secionToken.success){
        localStorage.setItem('Usuario','Autenticado');  
        localStorage.setItem('InfoUser',JSON.stringify(secionToken));
        localStorage.setItem('Role',JSON.stringify(secionToken.role))
    } else{
        localStorage.removeItem('Usuario');
        localStorage.removeItem('InfoUser');
        localStorage.removeItem('Role');
        this.router.navigate(['/IniciaLogin'])
    }
  }


}
