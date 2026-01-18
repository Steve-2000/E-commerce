const mongoose = require('mongoose');

const connectdatabase = () => {
    mongoose.connect(process.env.mongoURL)
        .then(con => {
            console.log(`Mongodb connected with server: ✅${con.connection.host}`);

        })
        .catch(err => {
            console.log(`Mongodb connection failed: ❌${err.message}`);
        });



}
module.exports = connectdatabase;