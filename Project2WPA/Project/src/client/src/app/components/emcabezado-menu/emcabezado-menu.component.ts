import { Component, OnInit } from '@angular/core';
import { infoUser } from '../user/modelos';
import {TaskService} from '../../services/task.service'

////Importamos el modulo o clase para las rutas 
import{Router} from '@angular/router';

//Importar JQuery
import * as $ from 'jquery';

//Libreria para las alerta sweetAlert
/* import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any; */
//const swal = require('sweetalert2')


@Component({
  selector: 'app-emcabezado-menu',
  templateUrl: './emcabezado-menu.component.html',
  styleUrls: ['./emcabezado-menu.component.css']
})
export class EmcabezadoMenuComponent implements OnInit {
  
  infoUser:{ name: string; email:string; username:string};
  Responsive:{_id:string,Username:string,opcion:string,Status:boolean};
  
  constructor(private taskservice:TaskService,private router: Router) { }

  ngOnInit() {
    this.InformacionUser()
  }

  InformacionUser(){
    this.infoUser = JSON.parse(localStorage.getItem('InfoUser'));
  }

  VerificaAcceso(e){
  const OpcionMenu = e 
  const Usuario  = this.infoUser.username
  var ParmetroAccesoOpcionMenu ={
    OpcionMenu: OpcionMenu,
    Username : Usuario
  }
   
   this.taskservice.getAccesoOpcionMenu(ParmetroAccesoOpcionMenu).subscribe(Responsive=>{this.Responsive=Responsive    
     if(this.Responsive !=null){
      console.log('SI tiene acceso')    
    }else{
      //swal('No Tiene Acceso a la Opcion : '+ParmetroAccesoOpcionMenu.OpcionMenu);
     /*  swal({
        title:"Aviso",
        text:"No Tiene Acceso a la Opcion: "+ParmetroAccesoOpcionMenu.OpcionMenu,
        icon: "error",        
      }); */      
      alert("No Tiene Acceso a la Opcion: "+ParmetroAccesoOpcionMenu.OpcionMenu)
      this.router.navigate(['/Inicio'])
    } 

  })
 }



 funNavToggel(){        

            // Configure tooltips for collapsed side navigation
            /* $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
                 template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
            }) */
            
            // Toggle the side navigation
            $("#sidenavToggler").click(function(e) {
                e.preventDefault();
                $("body").toggleClass("sidenav-toggled");
                $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
                $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
            });
  
            // Force the toggled class to be removed when a collapsible nav link is clicked
            $(".navbar-sidenav .nav-link-collapse").click(function(e) {
                e.preventDefault();
                $("body").removeClass("sidenav-toggled");
            });
  
            // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
            $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
              //var e0 = e.originalEvent,
              //delta = e0.wheelDelta || -e0.detail;
              //this.scrollTop += (delta < 0 ? 1 : -1) * 30;
              //e.preventDefault();
            });
  
            // Scroll to top button appear
            $(document).scroll(function() {
                var scrollDistance = $(this).scrollTop();
                if (scrollDistance > 100) {
                    $('.scroll-to-top').fadeIn();
                } else {
                    $('.scroll-to-top').fadeOut();
                }
            });
  
            // Configure tooltips globally
            //$('[data-toggle="tooltip"]').tooltip()

            // Smooth scrolling using jQuery easing
            $(document).on('click', 'a.scroll-to-top', function(event){
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: ($($anchor.attr('href')).offset().top)
                }, 1000, 'easeInOutExpo');
                event.preventDefault();
            });     
  }



}
