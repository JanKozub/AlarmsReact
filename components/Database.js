import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("myDB.db");

class Database {
    static createTable() {
        // db.transaction(tx => {
        //     tx.executeSql(
        //         "DROP TABLE alarms IF EXISTS"
        //     );
        // });
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alarms " +
                "(" +
                "id integer primary key not null, " +
                "time text, " +
                "days text, " +
                "state text, " +
                "music text, " +
                "vibration text" +
                ");"
            );

        });
    }

    static add(id, time, days, state, music, vibration) {
        db.transaction(tx => {
            tx.executeSql("INSERT INTO alarms (id, time, days, state, music, vibration) " +
                "values ('"
                + id + "', '"
                + time + "', '"
                + days + "', '"
                + String(state) + "', '"
                + String(music) + "', '"
                + String(vibration) + "'"
                + ")");
        })
    }

    static updateDays(id, days) {
        db.transaction(tx => {
            tx.executeSql("UPDATE alarms SET days='" + days + "' WHERE id='" + id + "';");
        })
    }

    static updateTime(id, time) {
        db.transaction(tx => {
            tx.executeSql("UPDATE alarms SET time='" + time + "' WHERE id='" + id + "';");
        })
    }

    static updateState(id, state) {
        db.transaction(tx => {
            tx.executeSql("UPDATE alarms SET state='" + String(state) + "' WHERE id='" + id + "';");
        })
    }

    static updateVibration(id, state) {
        db.transaction(tx => {
            tx.executeSql("UPDATE alarms SET vibration='" + String(state) + "' WHERE id='" + id + "';");
        })
    }

    static updateMusic(id, state) {
        db.transaction(tx => {
            tx.executeSql("UPDATE alarms SET music='" + String(state) + "' WHERE id='" + id + "';");
        })
    }

    static getAll() {
        let query = "SELECT * FROM alarms";
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                resolve(results);
            }, function (tx, error) {
                reject(error);
            });
        }))
    }

    static remove(id) {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM alarms WHERE (id = " + id + ");");
        });
    }
}

export default Database;