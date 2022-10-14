import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  databaseObj: SQLiteObject;
  tables = {
    quoties: 'quoties',
  };

  constructor(private sqlite: SQLite) {}

  // Create Database

  async createDatabase() {
    await this.sqlite
      .create({
        name: 'ionic_sqlite_crud',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch((e) => {
        alert('error on creating database ' + JSON.stringify(e));
      });

    await this.createTables();
  }

  // Create Tables

  async createTables() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.quoties}(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        typeDocument STRING NOT NULL,
        numberDocument STRING NOT NULL,
        nameSocial STRING NULL,
        phone INTEGER NOT NULL
        )`,
      []
    );
  }

  // Table Quoties

  async addQuote(
    typeDocument: string,
    numberDocument: string,
    nameSocial: string,
    phone: number
  ) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.quoties} 
          (typeDocument, numberDocument, nameSocial, phone) 
          VALUES ('${typeDocument}', '${numberDocument}', '${nameSocial}', '${phone}'
          )`,
        []
      )
      .then(() => {
        return 'quote created';
      })
      .catch((e) => {
        return 'error on creating quote ' + JSON.stringify(e);
      });
  }

  async getQuoties() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.quoties} ORDER BY nameSocial ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return 'error on getting quoties ' + JSON.stringify(e);
      });
  }

  async deleteQuote(id: number) {
    return this.databaseObj
      .executeSql(
        `DELETE FROM ${this.tables.quoties} 
        WHERE code = ${id}`,
        []
      )
      .then(() => {
        return 'quote deleted';
      })
      .catch((e) => {
        return 'error on deleting quote ' + JSON.stringify(e);
      });
  }

  async editQuote(
    id: number,
    typeDocument: String,
    numberDocument: String,
    nameSocial: String,
    phone: number
  ) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.quoties} 
          SET typeDocument = '${typeDocument}', numberDocument = '${numberDocument}', nameSocial = '${nameSocial}', phone = '${phone}'
          WHERE code = ${id}`,
        []
      )
      .then(() => {
        return 'quote updated';
      })
      .catch((e) => {
        if (e.code === 6) {
          return 'quote already exist';
        }
        return 'error on updating quote ' + JSON.stringify(e);
      });
  }
}
