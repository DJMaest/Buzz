import SQLite from 'react-native-sqlite-storage';
// SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "creds.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;




class DatabaseHandler {
    public db: SQLite.SQLiteDatabase;
    constructor() {
        // open database
        this.db = SQLite.openDatabase({ name: database_name, location:'default' }, this.openCB, this.errorCB);
        // console.log(SQLite);
    }

    openCB() {
        console.log("Database OPENED");
    }

    errorCB(err: SQLite.SQLError) {
        console.log("SQL Error: " + err);
    }


}


export default DatabaseHandler;