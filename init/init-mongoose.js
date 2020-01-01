let mongoose = require('mongoose');

module.exports = {
    connectToMongoose: function (connectionString) {
        const option = {
            socketTimeoutMS: 30000,
            keepAlive: true,
            reconnectTries: 30000,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connect(connectionString, option, (err) => {
            if (err) {
                console.log(err);
                console.log('Retrying Database Connection');
                this.connectToMongoose();
            }
            console.log("Database Connected", connectionString);            
        });
    }, mongoose
}