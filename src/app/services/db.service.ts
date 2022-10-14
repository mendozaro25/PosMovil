
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Quote } from './quote';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  songsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'quotiesDB.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchQuoties(): Observable<Quote[]> {
    return this.songsList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getQuoties();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getQuoties(){
    return this.storage.executeSql('SELECT * FROM quoties', []).then(res => {
      let items: Quote[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            typeDocument: res.rows.item(i).typeDocument,  
            numberDocument: res.rows.item(i).numberDocument,
            nameSocial: res.rows.item(i).nameSocial,
            phone: res.rows.item(i).phone
           });
        }
      }
      this.songsList.next(items);
    });
  }
  // Add
  addQuote(typeDocument, numberDocument, nameSocial, phone) {
    let data = [typeDocument, numberDocument, nameSocial, phone];
    return this.storage.executeSql('INSERT INTO quoties (typeDocument, numberDocument, nameSocial, phone) VALUES (?, ?, ?, ?)', data)
    .then(res => {
      this.getQuoties();
    });
  }
 
  // Get single object
  getQuoteById(id): Promise<Quote> {
    return this.storage.executeSql('SELECT * FROM quoties WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        typeDocument: res.rows.item(0).typeDocument,  
            numberDocument: res.rows.item(0).numberDocument,
            nameSocial: res.rows.item(0).nameSocial,
            phone: res.rows.item(0).phone
      }
    });
  }
  // Update
  updateQuote(id, quote: Quote) {
    let data = [quote.typeDocument, quote.numberDocument, quote.nameSocial, quote.phone];
    return this.storage.executeSql(`UPDATE quoties SET typeDocument = ?, numberDocument = ?, nameSocial = ?, phone = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getQuoties();
    })
  }
  // Delete
  deleteQuote(id) {
    return this.storage.executeSql('DELETE FROM quoties WHERE id = ?', [id])
    .then(_ => {
      this.getQuoties();
    });
  }
}