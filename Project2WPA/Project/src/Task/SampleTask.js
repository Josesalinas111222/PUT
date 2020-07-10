//'second' , 'minute', 'hour' ,'dayOfMonth','month'  , 'dayOfWeek'
//[[0, 59] , [0, 59] , [0, 23] , [1, 31]     , [0, 11] , [0, 6]];

//Tareas Programadas
var CronJob = require('cron').CronJob;

const job = new CronJob('10 32 10 * * *', function() {
    const d = new Date();
    console.log('Every second:', d);
    const Whatsapp = require('../routes/whatsapp')
    Whatsapp.MessWhatsappYo()
}, true);
job.start();