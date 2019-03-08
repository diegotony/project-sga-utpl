//====================================================
// PORT
//====================================================
process.env.PORT = process.env.PORT || 3000;

//====================================================
//Entorno
//====================================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================================================
// BD
//====================================================

let urlDB = "mongodb://admin:admin123@ds031895.mlab.com:31895/sga";
// if (process.env.NODE_ENV == 'dev') {
//     urlDB = 'mongodb://localhost:27017/arquitectura';
// } else {
//     urlDB = process.env.MONGO_URI;
// }

urlDB = "mongodb://admin:admin123@ds031895.mlab.com:31895/sga"
process.env.URLDB = urlDB;