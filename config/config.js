//====================================================
// PORT
//====================================================
process.env.PORT =  8080;


//====================================================
process.env.HOST = '0.0.0.0'
//====================================================
//Entorno
//====================================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================================================
// BD
//====================================================

let  urlDB;
//if (process.env.NODE_ENV == 'dev') {
urlDB = 'mongodb://mongo:27017/sga';

    //mongodb://admin:admin123@ds031895.mlab.com:31895/sga
//} else {
//    urlDB = process.env.MONGO_URI;
//}
process.env.URLDB = urlDB;

// ====================================================
// VENCIMIENTO DEL TOKEN
// ================================= ===================
process.env.CADUCIDAD_TOKEN = '30d';

//====================================================
// SEED Auth
//====================================================

process.env.SEED = process.env.SEED || 'secret-secret-really-secret';
// secret-secret-really-secret-prod
