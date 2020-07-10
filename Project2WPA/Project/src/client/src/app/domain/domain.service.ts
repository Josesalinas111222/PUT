
import { Injectable } from '@angular/core';

@Injectable()
export class DomainService { 

  constructor() { }

  RutaDomain(){
   const  Domain:string  = "http://LocalHost:3001";
   //const  Domain:string  = "http://201.220.141.14:3005";
    return Domain;
  }
}
