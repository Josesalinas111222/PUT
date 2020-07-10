import { Component, OnInit } from '@angular/core';
import { infoUser } from '../user/modelos';
import {TaskService} from '../../services/task.service'
import{Router} from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {
  
  infoUser:{ name: string; email:string; username:string};
  Responsive:{_id:string,Username:string,opcion:string,Status:boolean};
  
  constructor(private taskservice:TaskService,private router: Router) { }

  
  ngOnInit() {
    this.InformacionUser()
  }

  InformacionUser(){
    this.infoUser = JSON.parse(localStorage.getItem('InfoUser'));
  }

}
