const connectionString = "mongodb+srv://jack:test123@cluster0-kk03i.mongodb.net/myDatabase?retryWrites=true&w=majority";

let serverPort = process.env.PORT || 8000;

module.exports = { connectionString, serverPort};