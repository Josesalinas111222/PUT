import { Injectable } from '@angular/core';

//importamos las biblioteca enteras rxjs/rx para utilizar el [map]
import 'rxjs/Rx';

//Modulo para los observables
import { Observable } from 'rxjs/Rx';

//Modelos de Datos
import { FiltroSemafaro,FiltroCOnsolidado, GrupoProductos, infoProducto, Producto, sucursales, Task, Materias } from '../Task';

//Ruta de Domain
import { DomainService } from '../domain/domain.service'

//Importamos el modulo para importar los datos 
import{HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class TaskService {

  constructor(private http:HttpClient,private DomainService:DomainService) {}

  // Definimos las ruta de Nuestra API 
  domain:string = this.DomainService.RutaDomain();

  //Activacion de Reportes del sistemas
  getActivarreport(): Observable<any>{
    let _params = ""; 
    let headers = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(`${this.domain}/api/ActivarReportes/`,_params,{headers: headers});
  }
  //Activacion de Reportes del sistemas
  getActivarreportA(ValorActivacion): Observable<any>{
    let _params = JSON.stringify(ValorActivacion); 
    let headers = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(`${this.domain}/api/ActivarReportesA/`,_params,{headers: headers});
  }

  ///funcion que devuelve los tipos de ventas
  getTiposVentas(): Observable<any>{
    let _params = ""; 
    let headers = new HttpHeaders().set('Content-type','application/json')
    return this.http.get(`${this.domain}/api/tasks3/`);
  }

  ///funcion que devuelve las sucursales 
  getTaskSqlSucursales(): Observable<any>{   
      let _params = ""; 
      let headers = new HttpHeaders().set('Content-type','application/json')
      return this.http.post<sucursales>(`${this.domain}/api/tasks2/`,_params,{headers: headers});
 }

 //Funcion que devuelve las clases de producto 
  getTaskClases():Observable<any>{
     let _params = ""; 
     let headers = new HttpHeaders().set('Content-type','application/json')
     return this.http.post<sucursales>(`${this.domain}/api/ClasesProducto/`,_params,{headers: headers});
  } 

///funcion que devuelve grupo de producto
getTaskSqlGrupoProductos(): Observable<any>{
  let _params = ""; 
  let headers = new HttpHeaders().set('Content-type','application/json')
  return this.http.post<GrupoProductos>(`${this.domain}/api/tasks4/`,_params,{headers: headers});
}


    //seviciso de Datos para la tabla de resumen x sucursal reporte factura por producto 
  getResumenXSucursal(Tasks):Observable<any>{
      let _params = JSON.stringify(Tasks);
      let headers = new HttpHeaders().set('Content-type','application/json')
      return this.http.post(`${this.domain}/api/resumenxsucursal/`,_params,{headers: headers}); 
  }

  //Servicio de datos para tabla de resumen x Grupo x Producto Agrupado
  getResumenXProductoT(Tasks):Observable<any>{
    let _params = JSON.stringify(Tasks);
    let headers = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(`${this.domain}/api/resumenxgrupoprodctoAgrupado/`,_params,{headers: headers});
  }

  //Servicio de datos para tabla de resumen x Grupo x Producto detallado
  getResumenXProducto(Tasks):Observable<any>{
    let _params = JSON.stringify(Tasks);
    let headers = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(`${this.domain}/api/resumenxgrupoprodcto/`,_params,{headers: headers});
  }  

  //Serviviso de datos para tabla de resumen x categoria agrupado
  getResumenXCategoriaAgrupada(Tasks):Observable<any>{
    let _params = JSON.stringify(Tasks);
    let headers = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(`${this.domain}/api/resumenxcategoriaAgrupado/`,_params,{headers: headers}); 
  }

  ///Servicio de datos para tabla de resumen x categoria x sucursal detallado
  getResumenXCategoria(Tasks):Observable<any>{
    let _params = JSON.stringify(Tasks);
    let headers = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(`${this.domain}/api/resumenxcategoria/`,_params,{headers: headers}); 
  }

  //Servicio de datos para tabla de resumen x Codigo detallado
  getTaskSql(Tasks1): Observable<any>{   
      let _params = JSON.stringify(Tasks1);
      let headers = new HttpHeaders().set('Content-type','application/json')
      return this.http.post(`${this.domain}/api/tasks1/`,_params,{headers: headers});         
    } 

   detalleproductodescuento(filtro):Observable<any>{
      let _params = JSON.stringify(filtro);
      let headers = new HttpHeaders().set('Content-type','application/json')
      return this.http.post(`${this.domain}/api/detalleproductodescuento/`,_params,{headers: headers}); 
   }
     
   //Metodo de consulta datos [Get]
  getTask(){
    //Trae los datos del backend y utilizamos la interpolacion de javascrits
     var vInfoUs = JSON.parse(localStorage.getItem('InfoUser'));
     var cInfoUs = vInfoUs.username;
     let _headers = new HttpHeaders().set('usuario',cInfoUs)
     return this.http.get<Task[]>(`${this.domain}/api/tasks`,{headers: _headers})
     .map(res => res);
  }
  
  //*******Actualiza Tablas de filtros  de Mongo [Reporte de Ventas]
  //metodo que agrega datos
  addTask(newTask){
     return this.http.post<Task>(`${this.domain}/api/tasks`, newTask)
     .map(res => res); }

  //Metodo que borra un registro y lo envia al backend
  deleteTask(id){
    return this.http.delete<Task>(`${this.domain}/api/tasks/${id}`)
    .map(res => res);
  }

 //metodo actualiza un registro
  updateTask(newTask){
    return this.http.put(`${this.domain}/api/tasks/${newTask._id}`, newTask)
    .map(res=>res);
  }
  ////*****Fin
  

  //**********Actualiza Tablas filtros de Mongo y  sql  [Reporte ventas Consolidadas]
  //Metodo de consulta datos [Get] //Trae los datos que estas en la bd como filtros
    getFiltroConsolidado(){
      var vInfoUs = JSON.parse(localStorage.getItem('InfoUser'));
      var cInfoUs = vInfoUs.username;
      let _headers = new HttpHeaders().set('usuario',cInfoUs)
      return this.http.get<FiltroCOnsolidado[]>(`${this.domain}/api/filtroconsolidado`,{headers: _headers})
     .map(res => res);    
    }

   //metodo que agrega nuevos filtro al reporte de consolidado
   addFiltroConsolidado(newFiltroConsolidado){
    return this.http.post<FiltroCOnsolidado>(`${this.domain}/api/filtroconsolidado`, newFiltroConsolidado)
    .map(res => res); }

  //Metodo que borra un filtro del reporte consolidado
    deleteFiltroConsolidado(id){
    return this.http.delete<FiltroCOnsolidado>(`${this.domain}/api/filtroconsolidado/${id}`)
    .map(res => res);  }

    //metodo actualiza un registro
   updateFiltroConsolidado(newFiltroConsolidado){
    return this.http.put(`${this.domain}/api/filtroconsolidado/${newFiltroConsolidado._id}`, newFiltroConsolidado)
    .map(res=>res); }


  //Trae los datos del backend [REPORTE DE CONSOLIDADCION] 
  getConsolidado(FiltroCOnsolidado): Observable<any>{   
  let _params = JSON.stringify(FiltroCOnsolidado);
  let headers = new HttpHeaders().set('Content-type','application/json')
  return this.http.post(`${this.domain}/api/Consolidado/`,_params,{headers: headers});         
  } 

  //Trae los datos del backend [REPORTE DE CONSOLIDADCION] 
  getDescuentoConsolidado(FiltroCOnsolidado): Observable<any>{   
    let _params = JSON.stringify(FiltroCOnsolidado);
    let headers = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(`${this.domain}/api/DescuentoConsolidado/`,_params,{headers: headers});         
    }

 ////********Fin 

///**********Devuelve las col_fecha 
  Service_Toggle_columna(RangoF): Observable<any>{
   let _params = JSON.stringify(RangoF);
   let headers = new HttpHeaders().set('Content-type','application/json')
   return this.http.post(`${this.domain}/api/col_fecha/`,_params,{headers: headers}); 
  }
  datos_col_fecha(Tasks): Observable<any>{    
    let _params = JSON.stringify(Tasks);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/datos_col_fecha/`,_params,{headers: headers}); 
  }
  llama_sp(Tasks1):Observable<any>{    
    let _params = JSON.stringify(Tasks1);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/llama_sp/`,_params,{headers: headers}); 
  }
  llama_sp_Totales():Observable<any>{
    let _params = '';
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/llama_sp_Totales/`,_params,{headers: headers}); 
  }

  //********* Estadistico por Producto
  //producto
  getTaskProductos():Observable<any>{
    let _params = '';
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/TaskProductos/`,_params,{headers: headers}); 
  }  
  getResumenProducto(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/ResumenProducto/`,_params,{headers: headers}); 
  }
  getDetalladoProducto(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/DetalladoProducto/`,_params,{headers: headers}); 
  }
  getApertura(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/Apertura/`,_params,{headers: headers}); 
  }
  getAperturaPcs(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaPcs/`,_params,{headers: headers}); 
  }
  getAperturaVenta(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaVenta/`,_params,{headers: headers}); 
  }
  getAperturaPcsTranferidas(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaPcsTransferidas/`,_params,{headers: headers}); 
  }  
  getRVentaDetalle(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/RVentaDetalle/`,_params,{headers: headers}); 
  }
  getResumenVentaDetalle(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/ResumenVentaDetalle/`,_params,{headers: headers}); 
  }
  /////Categoria
  getTaskCategoriaProductoEstadaDistico():Observable<any>{
    let _params = '';
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/TaskCategoriaProductoEstadistico/`,_params,{headers: headers}); 
  }
  getResumenCategoriaProducto(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/ResumenCategoriaProducto/`,_params,{headers: headers}); 
  }
  getDetalladoCategoriaProducto(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/DetalladoCategoriaProducto/`,_params,{headers: headers}); 
  }
  getRVentaDetalleCategoria(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/RVentaDetalleCategoria/`,_params,{headers: headers}); 
  }
  getResumenVentaDetalleCategoria(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/ResumenVentaDetalleCategoria/`,_params,{headers: headers}); 
  }
  getAperturaCagtegoria(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaCategoria/`,_params,{headers: headers}); 
  }
  getAperturaPcsCategoria(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaPcsCategoria/`,_params,{headers: headers}); 
  }
  getAperturaVentaCategoria(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaVentaCategoria/`,_params,{headers: headers}); 
  }
  getAperturaPcsTranferidasCategoria(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaPcsTransferidasCategoria/`,_params,{headers: headers}); 
  }
  ////Proveedor
  getTaskProveedorProductoEstadaDistico():Observable<any>{
    let _params = '';
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/TaskProveedorProductoEstadistico/`,_params,{headers: headers}); 
  }
  getResumenProveedorProducto(Filtro):Observable<any>{    
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/ResumenProveedorProducto/`,_params,{headers: headers}); 
  }
  getResumenProveedorProductoTodoMayoreo(FiltroM):Observable<any>{    
    let _params = JSON.stringify(FiltroM);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/ResumenProveedorProductoTodoMayoreo/`,_params,{headers: headers}); 
  }
  getResumenProveedorProductoTodos(Filtro):Observable<any>{    
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/ResumenProveedorProductoTodos/`,_params,{headers: headers}); 
  }
  getDetalladoProveedorProducto(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/DetalladoProveedorProducto/`,_params,{headers: headers}); 
  }
  getDetalladoProveedorProductoMD(FiltroMD):Observable<any>{
    let _params = JSON.stringify(FiltroMD);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/DetalladoProveedorProductoMD/`,_params,{headers: headers}); 
  }
  getRVentaDetalleProveedor(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/RVentaDetalleProveedor/`,_params,{headers: headers}); 
  }
  getRVentaDetalleProveedorTodos(FiltroRD):Observable<any>{
    let _params = JSON.stringify(FiltroRD);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/RVentaDetalleProveedorTodos/`,_params,{headers: headers}); 
  }
  getResumenVentaDetalleProveedor(Filtro):Observable<any>{    
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/ResumenVentaDetalleProveedor/`,_params,{headers: headers}); 
  }
  getResumenVentaDetalleProveedorTodos(FiltroDD):Observable<any>{    
    let _params = JSON.stringify(FiltroDD);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/ResumenVentaDetalleProveedorTodos/`,_params,{headers: headers}); 
  }
  getAperturaProveedor(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaProveedor/`,_params,{headers: headers}); 
  }
  getAperturaProveedorConsolidado(Filtro):Observable<any>{    
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaProveedorConsolidado/`,_params,{headers: headers}); 
  }
  getAperturaTodosProveedorConsolidado(Filtro):Observable<any>{    
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaTodosProveedorConsolidado/`,_params,{headers: headers}); 
  }
  getAperturaProductoConsolidado(Filtro):Observable<any>{    
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaProductoConsolidado/`,_params,{headers: headers}); 
  }
  getAperturaCategoriaConsolidado(Filtro):Observable<any>{    
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaCategoriaConsolidado/`,_params,{headers: headers}); 
  }
  getAperturaProveedorTodos(FiltroPA):Observable<any>{
    console.log(FiltroPA)
    let _params = JSON.stringify(FiltroPA);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaProveedorTodos/`,_params,{headers: headers}); 
  }
  getAperturaPcsProveedor(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaPcsProveedor/`,_params,{headers: headers}); 
  }
  getAperturaVentaProveedor(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaVentaProveedor/`,_params,{headers: headers}); 
  }
  getAperturaPcsTranferidasProveedor(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AperturaPcsTransferidasProveedor/`,_params,{headers: headers}); 
  }

  ///*************************************Fin ****************************/

  ///********************** estadistico Venta  por Lote ******************/

  //Informacion del  Lote
  getInfoLotesDatos(lParamets):Observable<any>{        
    let _params =  JSON.stringify(lParamets);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/InfoLotesDatos/`,_params,{headers: headers});
   }
   getVentaLote(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/VentaLote/`,_params,{headers: headers}); 
  }
  getVentaLotePcsProducidas(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/VentaLotePcsProducidas/`,_params,{headers: headers}); 
  }
  getVentaLotePcsTranferidas(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/VentaLotePcsTransferidas/`,_params,{headers: headers}); 
  }
  getVentaLotePcsVentaDetalle(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/VentaLotePcsVentaDetalle/`,_params,{headers: headers}); 
  }
  getVentaLotePcsInventarioDetalle(Filtro):Observable<any>{    
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/VentaLotePcsInventarioDetalle/`,_params,{headers: headers}); 
  }
  getInfoLotesDatosFecha(lParamets):Observable<any>{         
    let _params =  JSON.stringify(lParamets);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/InfoLotesDatosFecha/`,_params,{headers: headers});
   }
   getInfoLotesDatosModal(lParamets):Observable<any>{         
    let _params =  JSON.stringify(lParamets);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/InfoLotesDatosModal/`,_params,{headers: headers});
   }
   getVentaLoteFecha(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/VentaLoteFeha/`,_params,{headers: headers}); 
  }
  getVentaLotePcsProducidasFecha(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/VentaLotePcsProducidasFecha/`,_params,{headers: headers}); 
  }
  getVentaLotePcsTranferidasFecha(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/VentaLotePcsTransferidasFecha/`,_params,{headers: headers}); 
  }  
  getVentaLotePcsVentaDetalleFecha(Filtro):Observable<any>{
    let _params = JSON.stringify(Filtro);
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/VentaLotePcsVentaDetalleFecha/`,_params,{headers: headers}); 
  }
   //********************************Produccion**************************** 
   getTaskLotes():Observable<any>{
    let _params = '';
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/TaskLotes/`,_params,{headers: headers});
   }
  
  //Produccion por lote
    getTaskLotesDatos(lParamets):Observable<any>{        
     let _params =  JSON.stringify(lParamets);
     let headers = new HttpHeaders().set('Content-type','application/json') 
     return this.http.post(`${this.domain}/api/TaskLotesDatos/`,_params,{headers: headers});
    }
    
    //Inventario Lote Sucursal                  
    getTaskInvLoteSucursal(lParamets):Observable<any>{      
      let _params =  JSON.stringify(lParamets);
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/InvLotesSucursal/`,_params,{headers: headers});
     }
    //Inventario Lote Bodega                  
     getTaskInvLoteBodega(lParamets):Observable<any>{      
      let _params =  JSON.stringify(lParamets);
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/InvLotesBodega/`,_params,{headers: headers});
     }
    //venta Lote Sucursal                  
    getTaskVentaLoteSucusal(lParamets):Observable<any>{
      let _params =  JSON.stringify(lParamets);
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/VentaLotesSucursal/`,_params,{headers: headers});
     }
     //DatosLotes 
     getDatosLote(lParamets):Observable<any>{
      let _params =  JSON.stringify(lParamets);
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/DatosLote/`,_params,{headers: headers});
     }

   //**********************************fin************************************
  
     //*******Actualiza Tablas de filtros  de Mongo [Inventarios]
     infoProducto():Observable<any>{
      let _params =  '';
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/InfoProducto/`,_params,{headers: headers});
     }
  
    getTaskInv(){
      //Trae los datos del backend y utilizamos la interpolacion de javascrits
       var vInfoUs = JSON.parse(localStorage.getItem('InfoUser'));
       var cInfoUs = vInfoUs.username;
       let _headers = new HttpHeaders().set('usuario',cInfoUs)
       return this.http.get<Task[]>(`${this.domain}/api/tasksInv`,{headers: _headers})
       .map(res => res);
    }
  
    //metodo que agrega datos
    addTaskInv(newTask){
      return this.http.post<Task>(`${this.domain}/api/tasksInv`, newTask)
      .map(res => res); }
  
    //Metodo que borra un registro y lo envia al backend
    deleteTaskInv(id){
      return this.http.delete<Task>(`${this.domain}/api/tasksInv/${id}`)
      .map(res => res);
    }
     //metodo actualiza un registro
     updateTaskInv(newTask){
      return this.http.put(`${this.domain}/api/tasksInv/${newTask._id}`, newTask)
      .map(res=>res);
    }
    ///Inventarios Totalizados
    InventarioTotalizado(Tasks):Observable<any>{
      let _params =  JSON.stringify(Tasks);
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/DatosInventarioTotalizado/`,_params,{headers: headers});
    }
    //Inventarios x Empresa
    InventariosEmpresa(Tasks):Observable<any>{
      let _params =  JSON.stringify(Tasks);
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/DatosInventarioEmpresa/`,_params,{headers: headers});
    }
    //Inventarios x Grupo de Produtos
    InventariosGrupoProducto(Tasks):Observable<any>{
      let _params =  JSON.stringify(Tasks);
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/DatosInventarioGrupoProducto/`,_params,{headers: headers});
    }
      //Inventarios x Proveedor 
      InventariosProveedor(Tasks):Observable<any>{
        let _params =  JSON.stringify(Tasks);
        let headers = new HttpHeaders().set('Content-type','application/json') 
        return this.http.post(`${this.domain}/api/DatosInventarioProveedor/`,_params,{headers: headers});
      }
    //Inventarios x Sucursal 
      InventariosSucursal(Tasks):Observable<any>{
        let _params =  JSON.stringify(Tasks);
        let headers = new HttpHeaders().set('Content-type','application/json') 
        return this.http.post(`${this.domain}/api/DatosInventarioSucursal/`,_params,{headers: headers});
      }
    //Inventarios x Sucursal 
      InventariosCategoria(Tasks):Observable<any>{
        let _params =  JSON.stringify(Tasks);
        let headers = new HttpHeaders().set('Content-type','application/json') 
        return this.http.post(`${this.domain}/api/DatosInventarioCategoria/`,_params,{headers: headers});
      }
    //Inventarios x producto
    Inventarios(Tasks):Observable<any>{
      let _params =  JSON.stringify(Tasks);
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/DatosInventario/`,_params,{headers: headers});
    }
    //*****************************************Fin 
  
    /////********************Inicio de Meta x Sucursal */
    //Detalle
    getMetasxSucursal():Observable<any>{    
      let _params =  '';
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/MetaXSucursal/`,_params,{headers: headers});
    }
  
     /////Mayoreo
     getMetasxSucursalMayoreo(Filtro):Observable<any>{
      console.log(Filtro);
      let _params =  Filtro;    
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/MetaXSucursalMayoreo/`,_params,{headers: headers});
    }
  
    /////Mayoreo Filtro por sucursal
    getMetasxSucursalMayoreoFiltros(Filtro):Observable<any>{    
      let _params =  Filtro;    
      let headers = new HttpHeaders().set('Content-type','application/json') 
      return this.http.post(`${this.domain}/api/MetaXSucursalMayoreoPorFiltros/`,_params,{headers: headers});
    }
  
    //*****************************************Fin 
  
  ////************Semafaro de Ventas */
  

  ///*********************************  Acceso Opcion Menu 
  getAccesoOpcionMenu(ParmetroAccesoOpcionMenu):Observable<any>{
    let _params =  ParmetroAccesoOpcionMenu;
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AccesoOpcionMenu/`,_params,{headers: headers});
  }
  ///**************fin  */
  
  //Fiesta
  getAsistenciaFiesta():Observable<any>{
    let _params =  '';
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AsistenciaFiestaConfirmacion/`,_params,{headers: headers});
  }
  getAsistenciaFiestaAct():Observable<any>{
    let _params =  '';
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AsistenciaFiestaConfirmadaActualizada/`,_params,{headers: headers});
  }
  
  getAsistenciaconfirmada(Filtro):Observable<any>{  
    let _params =  Filtro;
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/AsistenciaFiestaConfirmada/`,_params,{headers: headers});
  }

  getMaterias():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/actividades/`,_params,{headers: headers});
  }

  getCalificaciones():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/calificaciones/`,_params,{headers: headers});
  }

  getCalendario():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/calendario/`,_params,{headers: headers});
  }

  getCursosActuales():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/cursos-actuales/`,_params,{headers: headers});
  }

  getActividadesCursos():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/cursos-actuales1/`,_params,{headers: headers});
  }

  getActividadesCursosFiltros(id):Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/cursos-actuales2/${id}`,_params,{headers: headers});
  }

  getListaAlumnosXclase():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/listaalumnos/`,_params,{headers: headers});
  }

  getActividadesMateriaFiltros(id):Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/Actividades2/${id}`,_params,{headers: headers});
  }

  getActividadesEvaluacion(id):Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/Actividadesevaluacion/${id}`,_params,{headers: headers});
  }

  getCalificacionesFiltros(id):Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/calificaciones2/${id}`,_params,{headers: headers});
  }

  getActividadesAlumnos():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/actividades1/`,_params,{headers: headers});
  }

  getReporteNivel1():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/reportenivel1/`,_params,{headers: headers});
  }

  getReporteNivel2():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/reportenivel2/`,_params,{headers: headers});
  }

  getReporteNivel3():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/reportenivel3/`,_params,{headers: headers});
  }


  getAsistencias():Observable<any>{  
    let _params =  "";
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/asistencias/`,_params,{headers: headers});
  }
  AddImage(DatosActividad,filesToUpload): Observable<any>{    
    //this.http.post('http://LocalHost:4200/assets/img/',cFile).subscribe(res=>console.log('Listo'));
    console.log(filesToUpload)
    let _params = ""; 
    let headers = new HttpHeaders().set('Content-type','application/json')
    return this.http.post(`${this.domain}/api/AddImage`, DatosActividad,filesToUpload)   
   }

   AddActividad(Filtro):Observable<any>{    
    let _params =  Filtro;    
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/addactividad/`,_params,{headers: headers});
  }

  GetMessage():Observable<any>{    
    let _params =  "";    
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/chats/`,_params,{headers: headers});
  }

  AddAnuncio(Filtro):Observable<any>{    
    let _params =  Filtro;    
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/addAnuncio/`,_params,{headers: headers});
  }
  
  SendMessage(Filtro):Observable<any>{    
    let _params =  Filtro;    
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/addMensaje/`,_params,{headers: headers});
  }

  ModActividad(Filtro):Observable<any>{    
    let _params =  Filtro;    
    let headers = new HttpHeaders().set('Content-type','application/json') 
    return this.http.post(`${this.domain}/api/modactividad/`,_params,{headers: headers});
  }

}
