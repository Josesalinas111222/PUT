//aqui tenes una clase que podemos usar en cualquier parte del peoyecto de angular 
//aqui definimos los tipo de infomacion manejaremos

export class Materias{
   Materia:String;
   NombreMateria:String }


export class DatosM {
   Confirmar:boolean;
   EmpleadoGenera:string;
   NombreCompleto:string;
   NombreSucursal:string
}

 export class Task {
    _id?:string;
    title: string;
    isDone: boolean;
    filtro:string;
    FechaI:string;
    FechaF:string;
    username:string;
    n?: number;}

 export class FiltroCOnsolidado {
     _id?:string;
     title: string;
     isDone: boolean;
     filtro:string;
     FechaI:string;
     FechaF:string;
     codGrupoProducto:string;
     username:string;
     n?: number;}

  export  class ModelFiltroSemafaro {
        _id?:string;
        title: string;
        filtro:string;
        FechaI:string;
        FechaF:string;
        username:string;
        n?: number;}    
        
  export class FiltroSemafaro{
        _id?:string;
        title: string;
        filtro:string;
        FechaI:string;
        FechaF:string;
        Username:string;
        n?: number;}

 export class RangoFecha{
    FechaIni:string;
    FechaFin:string;
    filtro:string;
    tipo:string;}

///Modelo de resumen x sucursal
export class ResumenXSucursal{
  NombreSucursal:string;
  TipoFacturaDescrip:string;
  cantidad:number;
  total:number;
  Costo:number;
  categoria:string}

///Modelo de resumen x sucursal comp
export class ResumenXSucursalComp{
   NombreSucursal:string;
   TipoFacturaDescrip:string;
   cantidad:number;
   total:number;
   Costo:number;
   categoria:string} 

    ///modelo de datos reporte factura por productos
 export class Producto{
    Fecha:Date;
    NombreTipoProducto:string;
    NombreSucursal:string;
    CategoriaProducto:string;
    Producto:string;
    NombreProducto:string;
    Precio:number;
    Cantidad:string;
    Subtotal:number;
    PDescuento:number;
    Descuento:number;
    Total:number;}

  
  export class sucursales{
    nombre:string;}

 export class tiposdeventa {
    tipoventa1:String;
    tipoventa2:String}  

 export class GrupoProductos{
      GrupoProducto:String;
      nombre:String }


  ///Modelo datos Reporte de consolidado de ventas
  export class RptConsolidado{
        Sucursal:string;
        NombreSucursal:string;
        NombreTipoTransaccion:string;
        Cantidad:string;
        SubTotal:number;
        Descuento:number;
        Total:number;
        Costo:number;
        CostoTienda:number;
        UtilidadAlCosto:number;
        UtilidadAvergage:number;}


     //Modelo de datos para totales de rpt consolidado de ventas
     export class RptConsolidadoTotales{
         Cantidad:number=0;
         CantidadM:number=0;
         Total:number=0.00;
         TotalCosto:number=0.00;
         TotalUtilidadCosto:number=0.00;
         TotalUtilidadCostoAverage:number=0.00;
         TotalCT:number=0.00;
         TotalUtilidadCT:number=0.00;
         TotalUtilidadCTAverage:number=0.00;}

         export class Rango_f{
           fecha:string
         }

         export class datos_col_fecha {          
          CategoriaProducto:string;
          Nombre:string;
          NombreSucursal:string;
          cantidad:number;
          fecha:string;
          total:number;}

        export class datos {}

export class  ResumenXCategoriaT {
    CategoriaProducto:string;
    nombre:string;
    cantidad:number;
    subtotal:number;
    descuento:number;
    total:number;
}
 
 export class ResumenXCategoria{
    NombreSucursal:string;
    CategoriaProducto:string;
    nombre:string;
    cantidad:number;
    subtotal:number;
    descuento:number;
    total:number;
 }

 export class ResumenXProductop{
  NombreSucursal:string;
  GrupoProducto:string;
  nombre:string;
  cantidad:number;
  subtotal:number;
  descuento:number;
  total:number;
 }

 export class ResumenXProductopT{
  GrupoProducto:string;
  nombre:string;
  cantidad:number;
  subtotal:number;
  descuento:number;
  total:number;
 }

 export class infoProducto{
   producto:string;
   nombre:string
 }

 export class detalleventaproducto{
   sucursal :string;
   producto:string;
   precio:number;
   cantidad:number;
   pdescuento:number;
   descuento:number;
   total:number;
   nombretipodescuento:string;
 }




 