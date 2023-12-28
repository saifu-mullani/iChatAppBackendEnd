const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_DB_URI;
// const url = `mongodb+srv://mohammedsaifimulla:yNN5FV5hGGb69HCh@cluster0.yyrlkhp.mongodb.net/i_chat?retryWrites=true&w=majority`;
const initializeSchema =  require("./Schemas");

class MDBConnection {
    static async get() {
        const MongoURI = url;
        return this.connect(MongoURI);
    }

    static async connect() {
        try {
            const MongoURI = url;
            mongoose.Promise = global.Promise;
            // console.log("Establish     new connection with url", MongoURI);
            if (this.conn) {
                console.log("#### REUSING CONNECTION ####");
                return this.conn;
            } else {
                console.log("#### NEW CONNECTION ####");
                const options = {
                    serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
                    useNewUrlParser: true,
                };
                this.conn = await mongoose.connect(MongoURI, options);
                // console.log("######### INITIALIZED #########");
                await initializeSchema();
                console.log("######### INIT COMPLETE #########");
                return this.conn;
            }
        } catch (error) {
            console.log("Error ======> ", error);
            
        }
    }

    // static async disconnect() {
    //     console.log("### Closing connection ###");
    //     const conn = await this.conn;
    //     conn.connection.close();
    // }
}

module.exports = MDBConnection;
