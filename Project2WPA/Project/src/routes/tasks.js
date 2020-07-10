'use strict'

//creamos las tares y de aqui crearemos nuestra API
const express = require('express'); //Librerias de Express
const router = require('express').Router(); //Configuracion al modulos de rutas
const mongojs = require('mongojs'); //Libreria de Mongo
const db = mongojs('mean-db', ['tasks', 'user', 'tasksInv']); //conexion a la db de mongodb
const mssql = require('mssql'); //conexion a la db de  sql
const sqlConn = require('../Conexion/conexion') //Modulo conexion
const token = require('../ServicesAPI/jwt'); //servicio de token secrect
const Authen = require('../Middleware/Authenticated'); //Modulo que me Autentifica rutas privadas
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


//------------------------------------------------------------------------------Consultas 
//Actividades
//CODIGOS DE JOSE CARLOS INICIO 
router.post('/actividades', async(req, res, next) => {
        var sqlString = String("Select i.Materia,J.Nombre AS NombreMateria from TBLPMovimientoMatricula AS A ");
        sqlString = sqlString + "INNER JOIN TBLHMovimientoMatriculaDetalle AS I ON I.Documento = a.Documento "
        sqlString = sqlString + "INNER JOIN TBLAlumnos AS C ON A.Alumno = C.Alumno "
        sqlString = sqlString + "INNER JOIN TBLCursosGrados AS D ON D.Curso = A.curso "
        sqlString = sqlString + "INNER JOIN TBLSecciones AS E ON E.Seccion = A.seccion "
        sqlString = sqlString + "INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = A.PeriodoEscolar "
        sqlString = sqlString + "INNER JOIN TBLJornadas AS G ON G.jornada = A.Jornada "
        sqlString = sqlString + "INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion  "
        sqlString = sqlString + "INNER JOIN TBLMaterias AS J ON J.Materia = I.Materia where A.Alumno = 1 "
        var request = new mssql.Request(sqlConn);
        request.query(sqlString, async(err, result, recordset) => {
            if (err) return next(err);
            var datos = {};
            datos = await result.recordset;
            res.json(datos);
            console.log(datos)
        })
    })

//Calificaciones de Estudiantes
router.post('/calificaciones', async(req, res, next) => {
    var sqlString = String(" Select A.Actividad,A.Materia,b.Nombre AS NombreMateria,A.Titulo,A.FechaVencimiento,A.Puntaje,A.NotaFinal,A.Observaciones From TBLActividades AS A ");
    sqlString = sqlString + "INNER JOIN TBLMaterias AS B ON A.Materia = B.Materia order by A.Materia "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Calendario
router.post('/calendario', async(req, res, next) => {
    var sqlString = String(" Select Documento,CONVERT(DATE,FechaEvento) AS FechaEvento,Titulo,Cuerpo1,Cuerpo2,Salida,Institucion,RutaImagen,Uposteo,Fposteo,PC from TBLAnuncios WHERE Institucion = 01 ");
    sqlString = sqlString + " "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Calificaciones de Estudiantes
router.post('/cursos-actuales', async(req, res, next) => {
    var sqlString = String(" Select A.Documento,A.Fecha,A.Catedratico,C.NombreCompleto as NombreCatedratico,B.Materia,I.Nombre as NombreMateria,A.Curso,D.Nombre AS NombreCurso,a.Seccion,e.Nombre as NombreSeccion,a.PeriodoEscolar,f.nombre as NombrePeriodoEscolar,a.Jornada,g.nombre as NombreJornada from TBLPMovimientoAsignacionCatedraticos AS A ");
    sqlString = sqlString + "INNER JOIN TBLHMovimientoAsignacionCatedraticos AS B ON A.Documento = B.Documento "
    sqlString = sqlString + "INNER JOIN TBLCatedraticos AS C ON A.Catedratico = A.Catedratico "
    sqlString = sqlString + "INNER JOIN TBLCursosGrados AS D ON D.Curso = A.curso "
    sqlString = sqlString + "INNER JOIN TBLSecciones AS E ON E.Seccion = A.seccion "
    sqlString = sqlString + "INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = A.PeriodoEscolar "
    sqlString = sqlString + "INNER JOIN TBLJornadas AS G ON G.jornada = A.Jornada "
    sqlString = sqlString + "INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion "
    sqlString = sqlString + "INNER JOIN TBLMaterias AS I ON I.Materia = B.Materia "
    sqlString = sqlString + "WHERE A.Catedratico = '1' AND A.Institucion = '01' order by A.Fposteo DESC "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Calificaciones de Estudiantes
router.post('/cursos-actuales1', async(req, res, next) => {
    var sqlString = String(" Select A.Actividad,A.Fecha,A.Alumno,C.NombreCompleto as NombreAlumno,a.Materia,i.Nombre as NombreMateria,A.Titulo,A.Cuerpo1,A.Curso,D.Nombre AS NombreCurso,a.Seccion,e.Nombre as NombreSeccion, ");
    sqlString = sqlString + "a.PeriodoEscolar,f.nombre as NombrePeriodoEscolar,a.Jornada,g.nombre as NombreJornada,A.FechaVencimiento,A.Revisado,A.Finalizado,A.FechaCambioEstado,CONCAT(A.Puntaje,'%') AS Puntaje "
    sqlString = sqlString + "from TBLActividades AS A "
    sqlString = sqlString + "INNER JOIN TBLAlumnos AS C ON A.Alumno = A.Alumno "
    sqlString = sqlString + "INNER JOIN TBLCursosGrados AS D ON D.Curso = A.curso "
    sqlString = sqlString + "INNER JOIN TBLSecciones AS E ON E.Seccion = A.seccion "
    sqlString = sqlString + "INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = A.PeriodoEscolar "
    sqlString = sqlString + "INNER JOIN TBLJornadas AS G ON G.jornada = A.Jornada "
    sqlString = sqlString + "INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion "
    sqlString = sqlString + "INNER JOIN TBLMaterias AS I ON I.Materia = A.Materia "
    sqlString = sqlString + "WHERE A.Alumno = '1' AND A.Institucion = '01' "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Cursos Actuales FILTROOOOOOOOOOOOOOOS
//asistencias
router.post('/cursos-actuales2/:id', async(req, res, next) => {
    const Materia = req.params.id;
    var sqlString = String(" Select A.Actividad,A.Fecha,A.Alumno,C.NombreCompleto as NombreAlumno,a.Materia,i.Nombre as NombreMateria,A.Titulo,A.Cuerpo1,A.Curso,D.Nombre AS NombreCurso,a.Seccion,e.Nombre as NombreSeccion, ");
    sqlString = sqlString + "a.PeriodoEscolar,f.nombre as NombrePeriodoEscolar,a.Jornada,g.nombre as NombreJornada,A.FechaVencimiento,A.Revisado,A.Finalizado,A.FechaCambioEstado,CONCAT(A.Puntaje,'%') AS Puntaje "
    sqlString = sqlString + "from TBLActividades AS A "
    sqlString = sqlString + "INNER JOIN TBLAlumnos AS C ON A.Alumno = A.Alumno "
    sqlString = sqlString + "INNER JOIN TBLCursosGrados AS D ON D.Curso = A.curso "
    sqlString = sqlString + "INNER JOIN TBLSecciones AS E ON E.Seccion = A.seccion "
    sqlString = sqlString + "INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = A.PeriodoEscolar "
    sqlString = sqlString + "INNER JOIN TBLJornadas AS G ON G.jornada = A.Jornada "
    sqlString = sqlString + "INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion "
    sqlString = sqlString + "INNER JOIN TBLMaterias AS I ON I.Materia = A.Materia "
    sqlString = sqlString + "WHERE A.Alumno = '1' AND A.Institucion = '01' AND A.Materia = '" + Materia + "'"
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Lista de Estudiantes para las Clases
//Lista de Estudiantes
router.post('/listaalumnos', async(req, res, next) => {
    var sqlString = String(" Select A.Alumno,A.NombreCompleto AS NombreAlumno,B.Curso,D.Nombre AS NombreCurso,B.Seccion,e.Nombre as NombreSeccion,B.PeriodoEscolar,f.nombre as NombrePeriodoEscolar,B.Jornada,g.nombre as NombreJornada From TBLAlumnos AS A  ");
    sqlString = sqlString + "INNER JOIN TBLPMovimientoMatricula AS B ON A.Alumno = b.Alumno "
    sqlString = sqlString + "INNER JOIN TBLCursosGrados AS D ON D.Curso = B.curso "
    sqlString = sqlString + "INNER JOIN TBLSecciones AS E ON E.Seccion = B.seccion "
    sqlString = sqlString + "INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = B.PeriodoEscolar "
    sqlString = sqlString + "INNER JOIN TBLJornadas AS G ON G.jornada = B.Jornada "
    sqlString = sqlString + "INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion  "
    sqlString = sqlString + "WHERE A.Institucion = '01'"
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})


//Calificaciones FILTROOOOOOOOOOOOOOOS
//Calificaciones
router.post('/calificaciones2/:id', async(req, res, next) => {
    const Materia = req.params.id;
    var sqlString = String(" Select A.Actividad,A.Materia,b.Nombre AS NombreMateria,A.Titulo,A.FechaVencimiento,A.Puntaje,A.NotaFinal,A.Observaciones From TBLActividades AS A ");
    sqlString = sqlString + "INNER JOIN TBLMaterias AS B ON A.Materia = B.Materia where B.Nombre =  '" + Materia + "'"
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})


//Actividades FILTROOOOOOOOOOOOOOOS
//Actividades 
router.post('/Actividades2/:id', async(req, res, next) => {
    const Materia = req.params.id;
    var sqlString = String(" Select A.Actividad,A.Fecha,A.Alumno,C.NombreCompleto as NombreAlumno,a.Materia,i.Nombre as NombreMateria,A.Titulo,A.Cuerpo1,A.Curso,D.Nombre AS NombreCurso,a.Seccion,e.Nombre as NombreSeccion, ");
    sqlString = sqlString + "a.PeriodoEscolar,f.nombre as NombrePeriodoEscolar,a.Jornada,g.nombre as NombreJornada,A.FechaVencimiento,A.Revisado,A.Finalizado,A.FechaCambioEstado,CONCAT(A.Puntaje,'%') AS Puntaje  "
    sqlString = sqlString + "from TBLActividades AS A "
    sqlString = sqlString + "INNER JOIN TBLAlumnos AS C ON A.Alumno = A.Alumno "
    sqlString = sqlString + "INNER JOIN TBLCursosGrados AS D ON D.Curso = A.curso "
    sqlString = sqlString + "INNER JOIN TBLSecciones AS E ON E.Seccion = A.seccion "
    sqlString = sqlString + "INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = A.PeriodoEscolar "
    sqlString = sqlString + "INNER JOIN TBLJornadas AS G ON G.jornada = A.Jornada "
    sqlString = sqlString + "INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion "
    sqlString = sqlString + "INNER JOIN TBLMaterias AS I ON I.Materia = A.Materia "
    sqlString = sqlString + "WHERE A.Alumno = '1' AND A.Institucion = '01' AND A.Materia = '" + Materia + "'"
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Actividades para revision por cada una FILTROOOOOOOOOOOOOOOS
//Actividades para revision 
router.post('/Actividadesevaluacion/:id', async(req, res, next) => {
    const Actividad = req.params.id;
    var sqlString = String(" Select A.Actividad,A.Fecha,A.Alumno,C.NombreCompleto as NombreAlumno,a.Materia,i.Nombre as NombreMateria,A.Titulo,A.Cuerpo1,A.Curso,D.Nombre AS NombreCurso,a.Seccion,e.Nombre as NombreSeccion, ");
    sqlString = sqlString + "a.PeriodoEscolar,f.nombre as NombrePeriodoEscolar,a.Jornada,g.nombre as NombreJornada,A.FechaVencimiento,A.Revisado,A.Finalizado,A.FechaCambioEstado,CONCAT(A.Puntaje,'%') AS Puntaje,A.NotaFinal,A.Observaciones  "
    sqlString = sqlString + "from TBLActividades AS A "
    sqlString = sqlString + "INNER JOIN TBLAlumnos AS C ON A.Alumno = A.Alumno "
    sqlString = sqlString + "INNER JOIN TBLCursosGrados AS D ON D.Curso = A.curso "
    sqlString = sqlString + "INNER JOIN TBLSecciones AS E ON E.Seccion = A.seccion "
    sqlString = sqlString + "INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = A.PeriodoEscolar "
    sqlString = sqlString + "INNER JOIN TBLJornadas AS G ON G.jornada = A.Jornada "
    sqlString = sqlString + "INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion "
    sqlString = sqlString + "INNER JOIN TBLMaterias AS I ON I.Materia = A.Materia "
    sqlString = sqlString + "WHERE A.Alumno = '1' AND A.Institucion = '01' AND A.Actividad = '" + Actividad + "'"
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Calificaciones de Estudiantes
router.post('/actividades1', async(req, res, next) => {
    var sqlString = String(" Select A.Actividad,A.Fecha,A.Alumno,C.NombreCompleto as NombreAlumno,a.Materia,i.Nombre as NombreMateria,A.Titulo,A.Cuerpo1,A.Curso,D.Nombre AS NombreCurso,a.Seccion,e.Nombre as NombreSeccion, ");
    sqlString = sqlString + "a.PeriodoEscolar,f.nombre as NombrePeriodoEscolar,a.Jornada,g.nombre as NombreJornada,A.FechaVencimiento,A.Revisado,A.Finalizado,A.FechaCambioEstado "
    sqlString = sqlString + "from TBLActividades AS A "
    sqlString = sqlString + "INNER JOIN TBLAlumnos AS C ON A.Alumno = A.Alumno "
    sqlString = sqlString + "INNER JOIN TBLCursosGrados AS D ON D.Curso = A.curso "
    sqlString = sqlString + "INNER JOIN TBLSecciones AS E ON E.Seccion = A.seccion "
    sqlString = sqlString + "INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = A.PeriodoEscolar "
    sqlString = sqlString + "INNER JOIN TBLJornadas AS G ON G.jornada = A.Jornada "
    sqlString = sqlString + "INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion "
    sqlString = sqlString + "INNER JOIN TBLMaterias AS I ON I.Materia = A.Materia "
    sqlString = sqlString + "WHERE A.Alumno = '1' AND A.Institucion = '01' "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Reportes Nivel 1
router.post('/reportenivel1', async(req, res, next) => {
    var sqlString = String(" Select h.Institucion,H.Nombre as NombreInstitucion,A.Alumno,A.NombreCompleto AS NombreAlumno,B.Curso,D.Nombre AS NombreCurso,B.Seccion,e.Nombre as NombreSeccion, ");
    sqlString = sqlString + " B.PeriodoEscolar,f.nombre as NombrePeriodoEscolar,B.Jornada,g.nombre as NombreJornada From TBLAlumnos AS A   "
    sqlString = sqlString + " INNER JOIN TBLPMovimientoMatricula AS B ON A.Alumno = b.Alumno "
    sqlString = sqlString + " INNER JOIN TBLCursosGrados AS D ON D.Curso = B.curso "
    sqlString = sqlString + " INNER JOIN TBLSecciones AS E ON E.Seccion = B.seccion "
    sqlString = sqlString + " INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = B.PeriodoEscolar "
    sqlString = sqlString + " INNER JOIN TBLJornadas AS G ON G.jornada = B.Jornada "
    sqlString = sqlString + " INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion  "
    sqlString = sqlString + " WHERE A.Alumno = '1' AND A.Institucion = '01' "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})


//Reportes Nivel 2
router.post('/reportenivel2', async(req, res, next) => {
    var sqlString = String(" Select i.Nombre as NombreMateria,(Select SUM(NotaFinal) From TBLActividades AS AA WHERE AA.Materia = I.Materia) as NotaFinal,B.Curso,D.Nombre AS NombreCurso,B.Seccion,e.Nombre as NombreSeccion, ");
    sqlString = sqlString + " B.PeriodoEscolar,f.nombre as NombrePeriodoEscolar,B.Jornada,g.nombre as NombreJornada From TBLAlumnos AS A  "
    sqlString = sqlString + " INNER JOIN TBLPMovimientoMatricula AS B ON A.Alumno = b.Alumno "
    sqlString = sqlString + " INNER JOIN TBLHMovimientoMatriculaDetalle AS C ON C.Documento = B.Documento "
    sqlString = sqlString + " INNER JOIN TBLCursosGrados AS D ON D.Curso = B.curso "
    sqlString = sqlString + " INNER JOIN TBLSecciones AS E ON E.Seccion = B.seccion "
    sqlString = sqlString + " INNER JOIN TBLPeriodoEscolar AS F ON F.PeriodoEscolar = B.PeriodoEscolar "
    sqlString = sqlString + " INNER JOIN TBLJornadas AS G ON G.jornada = B.Jornada "
    sqlString = sqlString + " INNER JOIN TBLInstituciones AS H ON H.Institucion = A.institucion  "
    sqlString = sqlString + " INNER JOIN TBLMaterias AS I ON I.Materia = C.Materia "
    sqlString = sqlString + " WHERE A.Alumno = '1' AND A.Institucion = '01' "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Reportes Nivel 3
router.post('/reportenivel3', async(req, res, next) => {
    var sqlString = String(" DECLARE @Reporte1 TABLE(ID INT,Descripcion Varchar(MAX),Valor Decimal (16,2),Descripcion2 Varchar(60) default '') ");
    sqlString = sqlString + " INSERT INTO @Reporte1(ID,Descripcion,Valor)  "
    sqlString = sqlString + " Select 1,'Promedio:' as NombrePromedio,Sum(NotaFinal)/(Select count(BB.Materia) from TBLPMovimientoMatricula AS AA INNER JOIN TBLHMovimientoMatriculaDetalle AS BB ON AA.Documento = BB.Documento WHERE AA.Alumno = A.Alumno) AS Promedio From TBLActividades AS A   "
    sqlString = sqlString + " INNER JOIN TBLAlumnos AS B ON A.Alumno = B.Alumno  "
    sqlString = sqlString + " Where A.Alumno = 1 GROUP BY A.Alumno  "
    sqlString = sqlString + "   "
    sqlString = sqlString + " INSERT INTO @Reporte1(ID,Descripcion,Valor)  "
    sqlString = sqlString + " Select 2,'Cantidad Clases Cursadas:',count(BB.Materia) from TBLPMovimientoMatricula AS AA INNER JOIN TBLHMovimientoMatriculaDetalle AS BB ON AA.Documento = BB.Documento WHERE AA.Alumno = '1'  "
    sqlString = sqlString + "   "
    sqlString = sqlString + " INSERT INTO @Reporte1(ID,Descripcion,Valor)  "
    sqlString = sqlString + " Select 3,CASE WHEN Valor < 60 THEN 'ESTADO: DEBAJO DEL PROMEDIO ACEPTADO PARA APROBAR EL PERIODO ESCOLAR ACTUAL' ELSE 'ESTADO: APROBADO' END,0 From @Reporte1 Where ID = 1  "
    sqlString = sqlString + "   "
    sqlString = sqlString + "  Select * From @Reporte1 "
    sqlString = sqlString + "  "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//Chat Familia
router.post('/chats', async(req, res, next) => {
    var sqlString = String(" Select Sujeto,CONCAT(Sujeto,': ',Mensaje) as Mensaje,convert(date,Fposteo) as Fposteo,CONCAT(datepart(HOUR,Fposteo),':',datepart(Minute,Fposteo),':',datepart(second,Fposteo)) as Hora From TBLChats order by Fposteo asc ");    
    sqlString = sqlString + "  "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})

//asistencias
router.post('/vermensaje', async(req, res, next) => {
    var sqlString = String("Select Sujeto,CONCAT(Sujeto,': ',Mensaje) as Mensaje,Fposteo From TBLChats order by Fposteo asc ");
    sqlString = sqlString + " "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})


//asistencias
router.post('/asistencias', async(req, res, next) => {
    var sqlString = String("Select a.Alumno,B.NombreCompleto,CAST(a.Fecha AS date) AS Fecha,CONCAT(DATEPART(HOUR,A.Fecha),':',FORMAT(DATEPART(MINUTE,A.Fecha),'00'),':',FORMAT(DATEPART(SECOND,A.Fecha),'00'),' AM') AS HORA,CASE WHEN DATEPART(MINUTE,A.Fecha) >= 6 THEN 'TARDE' ELSE CASE WHEN DATEPART(HOUR,A.Fecha) > 7 THEN 'TARDE' ELSE 'A TIEMPO' END END AS Estado From TBLAsistenciaAlumnos AS A INNER JOIN TBLAlumnos AS B ON A.Alumno = B.Alumno where A.Alumno = 1");
    sqlString = sqlString + " "
    var request = new mssql.Request(sqlConn);
    request.query(sqlString, async(err, result, recordset) => {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
        console.log(datos)
    })
})


//Agregar actividad a la base de Datos
router.post('/addactividad', (req, res, next) => {
    const Filtro = req.body;
    var sqlSP = String("EXEC [dbo].[PRDAddActividad] '" + Filtro.Materia + "','" + Filtro.Titulo + "','" + Filtro.Cuerpo1 + "','" + Filtro.FechaVencimiento + "','" + Filtro.Puntaje + "'");
    sqlSP = sqlSP + '';
    //    
    var request = new mssql.Request(sqlConn);
    request.query(sqlSP, async function(err, result, recordset) {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
    })
})

//Agregar Anuncio a la base de Datos
router.post('/addAnuncio', (req, res, next) => {
    const Filtro = req.body;
    var sqlSP = String("EXEC [dbo].[PRDAddAnuncio] '" + Filtro.FechaEvento + "','" + Filtro.Titulo + "','" + Filtro.Cuerpo1 + "','" + Filtro.Cuerpo2 + "','" + Filtro.Salida + "','" + Filtro.RutaImagen + "'");
    sqlSP = sqlSP + '';
    //    
    var request = new mssql.Request(sqlConn);
    request.query(sqlSP, async function(err, result, recordset) {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
    })
})

//Agregar Anuncio a la base de Datos
router.post('/addMensaje', (req, res, next) => {
    const Filtro = req.body;
    var sqlSP = String("EXEC [dbo].[PRDAddMensaje] '" + Filtro.Sujeto + "','" + Filtro.Mensaje + "'");
    sqlSP = sqlSP + '';
    //    
    var request = new mssql.Request(sqlConn);
    request.query(sqlSP, async function(err, result, recordset) {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
    })
})


//Modificar Actividad
router.post('/modactividad', (req, res, next) => {
    const Filtro = req.body;
    var sqlSP = String("EXEC [dbo].[PRDModActividad] '" + Filtro.ActividadClase + "','" + Filtro.Puntaje + "','" + Filtro.observaciones + "'");
    sqlSP = sqlSP + '';
    //    
    var request = new mssql.Request(sqlConn);
    request.query(sqlSP, async function(err, result, recordset) {
        if (err) return next(err);
        var datos = {};
        datos = await result.recordset;
        res.json(datos);
    })
})

//CODIGOS DE JOSE CARLOS INICIO FIN

//////*******************************TOKEN  y  Usuarios ********************************** */
///creamos un usuario de ejemplo
router.post('/AddUser', upload.fields([]), (req, res) => {
    res.json({ success: true });
    const { username, password, fullname, email, status, role, comment } = req.body;
    //Modelo de user
    var cUsername = username; // 'Cristhian';
    var cName = fullname; //'Cristhian Adalid Aguilar Vargas';
    var cPass = password; //'Cristhian.*.';
    var cEmail = email; //'gerentedeproducto@tiendasrosy.com';
    var cAdmin = status; // true;
    var cRole = role; //'2';
    var cComent = comment;
    var hash = bcrypt.hashSync(cPass, salt)

    const nick = ({
        username: cUsername,
        password: hash,
        name: cName,
        email: cEmail,
        admin: cAdmin,
        role: cRole,
        comment: cComent
    });

    // save the  user
    db.user.save(nick, function(err) {
        if (err) throw err;
        //console.log('User saved successfully');
        res.json({ success: true });
    });
});

router.get('/viewUsers', (req, res) => {
    db.user.find({}, (err, users) => {
        res.json(users);
    });
});

////******Funcion que autentifica el usuario y genera el token 
router.post('/autentificacion', function(req, res) {
    const Datos = req.body
    db.user.findOne({ username: Datos[0].username }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Autentificacion Fallida. Usuario no encontrado.' });
        } else if (user) {

            if (bcrypt.compareSync(Datos[0].password, user.password)) { //if (user.password != Datos[0].password) {
                res.json({
                    token: token.createToken(user),
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    success: true,
                    role: user.role
                });
            } else {
                res.json({ success: false, message: 'Autentificacion Fallida. Password Incorrecto.' });
            }
        }
    });
});
///////////**********autentifica las rutas privadas 
router.get('/private', Authen.ensureAuthenticated, (req, res) => {
    var token = req.headers.authorization.split(' ')[1];
    res.json({ message: 'Autenticado correctamente y tu _id es:' + req.user });
});

router.post('/AccesoOpcionMenu', (req, res, next) => {
    const DatosOpcionUser = req.body;
    db.OpcionMenu.findOne({ username: req.body.Username, opcion: req.body.OpcionMenu }, (err, Datos) => {
        if (err) return next(err);
        res.json(Datos);
    });
})



///*******************************Fin de ejemplos uso de TOKEN***************************




module.exports = router;