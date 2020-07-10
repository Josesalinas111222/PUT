import { Observable } from 'rxjs/Rx';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

////Importamos el modulo o clase para las rutas 
import{Router} from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

    canActivate(
      route:ActivatedRouteSnapshot,
      state:RouterStateSnapshot
    ):Observable<boolean> | boolean {
        if(localStorage.getItem('Usuario')=='Autenticado'){
            return true
         }
         this.router.navigate(['/IniciaLogin'])
         return false
     }

}
