const mongoose = require('mongoose');

const dbconnection =() =>{
    mongoose.connect(process.env.DB_URI).then((conn) => {
        console.log('data connect' + conn.connection.host);
    }).catch((err) => {
        console.error('data error ' + err);
        process.exit(1);
    });
};
module.exports = dbconnection;