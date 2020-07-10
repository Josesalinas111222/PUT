import { BrowserModule } from '@angular/platform-browser';

//Material.Angular
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableDataSource,MatTableModule,MatSort } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';


//Graficos
import { ChartsModule } from 'ng2-charts';


//ngx-bootstrap 
import { NgModule, Component } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap';   //Para el uso de ngx-bootstrap   [para sus componentes]
import { BsDatepickerModule } from 'ngx-bootstrap';  //para uso de datepicker 

//Importamos la clase Toastr
import { ToastrModule } from 'ngx-toastr';

//Importamos los servicios del proyecto 
import {TaskService } from './services/task.service';
import { ExcelService } from './ServiceExcel/service.excel';
import {SharedService} from '../app/components/user/Shared/shared.service';
import {AuthGuardService} from '../app/components/Guards/auth.guard.service';
import {DomainService} from './domain/domain.service';

//Importamos el modulo formsModule para que los ngModel se ejecuten correctamente
import {FormsModule} from '@angular/forms';



//Esto los importa automaticamente cuando generamos los componentes 

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component'; //Componente de pantalla de inicio
import { BarraProgresoComponent } from './components/barraprogreso/barraprogreso.component';
import { SingInComponent } from './components/user/sing-in/sing-in.component';///Componentes de login 
import { EmcabezadoMenuComponent } from './components/emcabezado-menu/emcabezado-menu.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';


//Importamos el modulo HttpClient tambien  en nuestro app.module.ts 
import {HttpClientModule} from '@angular/common/http';

////Importamos el modulo o clase para las rutas 
import{Routes,RouterModule} from '@angular/router';
import { from } from 'rxjs';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { CatedraticosComponent } from './components/catedraticos/catedraticos.component';
import { MateriasComponent } from './components/materias/materias.component';
import { PadresComponent } from './components/padres/padres.component';
import { PeriodoescolarComponent } from './components/periodoescolar/periodoescolar.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
import { CursosygradosComponent } from './components/cursosygrados/cursosygrados.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CursosActualesComponent } from './components/cursos-actuales/cursos-actuales.component';
import { VerActividadComponent } from './components/ver-actividad/ver-actividad.component';
import { CrearCalendarioComponent } from './components/crear-calendario/crear-calendario.component';
import { AsistenciasComponent } from './components/asistencias/asistencias.component';
import { RevisionComponent } from './components/revision/revision.component';
import { RevisionclasesComponent } from './components/revisionclases/revisionclases.component';
import { RevisionclasesactividadesComponent } from './components/revisionclasesactividades/revisionclasesactividades.component';
import { Reportes1Component } from './components/reportes1/reportes1.component';
import { ChatdocenteComponent } from './components/chatdocente/chatdocente.component';
import { ChatfamiliaComponent } from './components/chatfamilia/chatfamilia.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';

////Objeto que  crea las router de navegacion usando el RouterLink
const appRoutes : Routes = [
  {  path : 'IniciaLogin',component:SingInComponent},
  {  path : 'Inicio', component:InicioComponent,canActivate:[AuthGuardService]},
  {  path : 'Alumno', component:AlumnoComponent,canActivate:[AuthGuardService]},
  {  path : 'calificaciones', component:CalificacionesComponent},
  {  path : 'catedraticos', component:CatedraticosComponent,canActivate:[AuthGuardService]},
  {  path : 'cursosygrados', component:CursosygradosComponent,canActivate:[AuthGuardService]},
  {  path : 'materias', component:MateriasComponent,canActivate:[AuthGuardService]},
  {  path : 'padres', component:PadresComponent,canActivate:[AuthGuardService]},
  {  path : 'periodoescolar', component:PeriodoescolarComponent,canActivate:[AuthGuardService]},
  {  path : 'actividades', component:ActividadesComponent,canActivate:[AuthGuardService]},
  {  path : 'calendario', component:CalendarioComponent,canActivate:[AuthGuardService]},
  {  path : 'cursos-actuales', component:CursosActualesComponent,canActivate:[AuthGuardService]},
  {  path : 'actividades/VerActividad/:id', component:VerActividadComponent},
  {  path : 'crear-calendario', component:CrearCalendarioComponent},
  {  path : 'asistencias', component:AsistenciasComponent},
  {  path : 'revision', component:RevisionComponent},
  {  path : 'revision/clases', component:RevisionclasesComponent},
  {  path : 'revision/clases/:id', component:RevisionclasesactividadesComponent},
  {  path : 'reportes1', component:Reportes1Component},
  {  path : 'chatdocente', component:ChatdocenteComponent},
  {  path : 'chatfamilia', component:ChatfamiliaComponent},
  {  path : 'bienvenida', component:BienvenidaComponent},
  //{  path : 'MetasMayoreo' , component:MetasMayoreo,canActivate:[AuthGuardService]},
  {  path : ' ', pathMatch:'full', redirectTo:'IniciaLogin'},
  {  path : '**', pathMatch:'full', redirectTo:'IniciaLogin'}
];

@NgModule({
  declarations: [
    AppComponent,    
    InicioComponent,
    SingInComponent,
    BarraProgresoComponent,
    EmcabezadoMenuComponent,
    PiePaginaComponent,
    AlumnoComponent,
    CatedraticosComponent,
    MateriasComponent,
    PadresComponent,
    PeriodoescolarComponent,
    CalificacionesComponent,
    CursosygradosComponent,
    ActividadesComponent,
    CalendarioComponent,
    CursosActualesComponent,
    VerActividadComponent,
    CrearCalendarioComponent,
    AsistenciasComponent,
    RevisionComponent,
    RevisionclasesComponent,
    RevisionclasesactividadesComponent,
    Reportes1Component,
    ChatdocenteComponent,
    ChatfamiliaComponent,
    BienvenidaComponent,        
  ],
  
  imports: [
     BrowserModule,
     HttpClientModule,   //Agregamos el modulo que importamos
     FormsModule,        //Agregamos para que se ejecuten los ngModel
     RouterModule.forRoot(appRoutes),   //agregamos metodo de router para usar RouterLink 
     TypeaheadModule.forRoot(),         //Para el uso de ngx-bootstrap
     BsDatepickerModule.forRoot(),      //para el uso de datepicker de  ngx-bootstrap
     MatInputModule,          //material.Angular
     BrowserAnimationsModule, //material.Angular 
     MatStepperModule,        //Material.Angular 
     MatPaginatorModule,      //Material.Angular 
     MatSlideToggleModule,    //Material.Angular    
     //MatTableDataSource,    //No se puede Importar tiene que ser por pantalla la importacion Material.Angular
     MatTableModule,          //Material.Angular  
     MatCheckboxModule,       //Material.Angular 
     MatDatepickerModule,      //Material.Angular  
     MatNativeDateModule,
     MatButtonModule,
     ChartsModule,
     ToastrModule.forRoot(),
     ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),   // ToastrModule added      
  ],

  providers: [TaskService,     //Aqui agregamos el servicio de Task 
              SharedService,   //Aqui agregamos el servicio de Usuarios  
              AuthGuardService,//Aqui agregamos el servicio del guards 
              DomainService,
              MatDatepickerModule,   //Material.Angular
              ExcelService],  
                           
  bootstrap: [AppComponent],   //Bootstrap
})

export class AppModule { }

